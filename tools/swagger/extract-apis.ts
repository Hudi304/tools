import chalk from 'chalk';
import { DTO_File } from '.';
import { dashCase, getApiImports, getType, lowercaseFirstLetter } from './swagger-utils';


export function extractApis(jsonData, name, enums): DTO_File[] {
  let paths = jsonData.paths;
  console.log(chalk.yellowBright("Parsing APIs..."))
  let groups = groupApis(paths, name, enums);
  const keyNames = Object.keys(groups)
  const groupKeysArray = keyNames.map((keyName) => { return { name: keyName, values: groups[keyName] } })
  const apiFilesList = groupKeysArray.map(group => {
    let methodsContent = group.values.map(method => {
      let queryParams = ""
      if (method.queryParams.length) {
        queryParams = '?' + method.queryParams.map(item => item.name + '=${' + item.name + '}').join('&')
      }
      const fName = method.methodName
      const par = method.parameters
      const hPar = method.headerParams
      const fPar = [...par, ...hPar].join(', ')
      const responseType = method.responseType
      const httpMethod = method.method
      const requestType = method.requestType ? ', body' : ""
      const headerLgn = hPar.length ? ', {headers}' : ""

      return `export const ${fName} = (${fPar}): Promise<${responseType}> => {\n`
        + `  return API().${httpMethod}(\`${method.path}${queryParams}\`${requestType}${headerLgn})\n};\n`
    }).join('\n')
    let imports = group.values.reduce((all, method) => all.concat(method.imports), []);
    imports = Array.from(new Set(imports)).join("");
    imports += `import { API } from "@/api";\n`;

    let tsContent = `${imports}\n${methodsContent}`;

    return {
      name: dashCase(group.name),
      content: tsContent
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