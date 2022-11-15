import chalk from 'chalk';
import { DTO_File } from '.';
import { dashCase, getApiImports, getType, lowercaseFirstLetter, removeDuplicates, sp } from './swagger-utils';

export function extractApis(jsonData, name, enums): DTO_File[] {
  let paths = jsonData.paths;
  console.log(chalk.yellowBright("Parsing APIs..."))
  let groups = groupApis(paths, name, enums);
  const keyNames = Object.keys(groups)
  const groupKeysArray = keyNames.map((keyName) => { return { name: keyName, values: groups[keyName] } })
  const apiFilesList = groupKeysArray.map(group => {
    let imports = extractFileImports(group)
    let methodsContent = getMethodContent(group)
    const fileContent = `${imports}\n${methodsContent}`;
    const fileName = dashCase(group.name)
    return {
      name: fileName,
      content: fileContent
    }
  });
  return apiFilesList
}

function groupApis(paths, name, enums) {
  let groups = {}

  Object.keys(paths).forEach(path => {
    Object.keys(paths[path]).forEach(method => {
      let api = paths[path][method];

      let tag = api.tags ? api.tags[0] : 'services';
      let requestContent = api.requestBody ? api.requestBody.content : undefined

      let requestType = requestContent ? getType((requestContent['application/json'] || requestContent['multipart/form-data']).schema) : 'null'
      let responseContent = (api.responses['200'] || api.responses['201'] || api.responses['204'])?.content;
      let responseType = responseContent ? getType(responseContent['application/json'].schema) : 'null'
      let methodName = api.operationId?.split('_').pop() + 'Api';
      let imports = getApiImports(paths[path][method], enums);
      methodName = lowercaseFirstLetter(methodName);
      groups[tag] = groups[tag] || [];

      let headerParams = api.parameters ? api.parameters.filter(param => param.in === 'header') : []
      let queryParams = api.parameters ? api.parameters.filter(param => param.in === 'query') : []
      let pathParams = api.parameters ? api.parameters.filter(param => param.in === 'path') : []

      if (api.operationId?.includes('Image') && api.operationId.includes('Update')) {
        requestType = "FormData"
      }

      groups[tag].push({
        methodName,
        method,
        responseType,
        imports,
        requestType: requestType != 'null' ? requestType : undefined,
        path: path.replace(`/${name}`, "").replace(/{version}/gm, 'v1').replace(/{/gm, '${'),
        parameters: [...pathParams, ...queryParams].map(param => `${param.name}: ${getType(param.schema)}`).concat(requestType != 'null' ? ['body: ' + requestType] : []),
        headerParams: headerParams.length ? ['headers: {' + headerParams.map(param => `"${param.name}": ${getType(param.schema)}`) + '}'] : [],
        queryParams
      })
    })
  })

  return groups
}

type fn = {
  sign: {
    name: string,
    parameters: string,
    responseType: string,
    headerParameters: string
  }
  body: {
    httpMethod: string
    path: string
    queryParams: string
    requestType: string
    headers: string
  }

}

function getMethodContent(group: { name: string, values: any }) {
  const methods = group.values.map(method => {
    let queryParams = getQueryParams(method)
    const fSign: fn = {
      sign: {
        name: method.methodName,
        parameters: method.parameters,
        responseType: method.responseType,
        headerParameters: method.headerParams
      },
      body: {
        httpMethod: method.method,
        path: method.path,
        queryParams,
        requestType: method.requestType ? ', body' : "",
        headers: method.headerParams.length ? ', {headers}' : ""
      }
    }
    const functionSignature = formatFunctionSignature(fSign)
    const functionBody = formatFunctionBody(fSign)
    return `${functionSignature} => {\n${functionBody}\n};\n`
  }).join('\n')

  return methods
}

function extractFileImports(group: { name: string, values: any }) {
  const imports = `import { API } from "@/api";\n`;
  const importsArray = group.values.reduce((all, method) => all.concat(method.imports), []);
  const importsStr = removeDuplicates(importsArray).join("");
  return imports + importsStr
}

function getQueryParams(method: any): string {
  let queryParams = ""
  if (method?.queryParams?.length) {
    const quarryParamArray = method.queryParams.map(item => item.name + '=${' + item.name + '}')
    queryParams = '?' + quarryParamArray.join('&')
  }
  return queryParams;
}

function formatFunctionSignature({ sign }: fn): string {
  const { name, parameters, responseType, headerParameters } = sign
  const sgn: string = `export const ${name} = (${parameters}): Promise<${responseType}>`
  if (sgn.length >= 80) {
    let formatted = ""
    const splitSgn = sgn.split(",")
    for (let i = 1; i < splitSgn.length; i++) {
      splitSgn[i] = sp(2) + splitSgn[i].trim()
    }
    formatted = splitSgn.join(",\n")
    formatted = formatted.replace(")", "\n)")
    formatted = formatted.replace("(", "(\n  ")

    return formatted
  }
  return sgn
}

function formatFunctionBody({ body }: fn): string {
  const { httpMethod, path, queryParams, requestType, headers } = body
  let formatted = "";
  const returnStm = `  return API()\n`
  const method = `    .${httpMethod}(\`${path}${queryParams}\`${requestType}${headers})`
  const fnBody = returnStm + method
  if (fnBody.length >= 80) {
    let [path, quarryParams] = method.split("?")
    path += "?\`"
    const spaces = sp(6)
    const paramsArray = quarryParams.split("&")
    for (let i = 0; i < paramsArray.length - 1; i++) {
      paramsArray[i] = spaces + `+ \`${paramsArray[i].trim()}&\``
    }
    const last = paramsArray.length - 1
    paramsArray[last] = spaces + `+ \`${paramsArray[last].trim()}`
    formatted = paramsArray.join("\n")
    return returnStm + path + "\n" + formatted
  }
  return fnBody
}