export function getKeysAsArray(obj: any): any[] {
  const keyNames = Object.keys(obj)
  const rez = keyNames
    .map((keyName) => { return { name: keyName, ...obj[keyName] } })
  return rez
}

export function lowercaseFirstLetter(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export function uppercaseFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function dashCase(str: string) {
  let s = str.charAt(0).toLowerCase() + str.slice(1);
  return s.replace(/([A-Z])/gm, '-$1').toLowerCase();
}

export function getType(prop: any) {
  switch (prop.type) {
    case 'integer':
    case 'number':
      return 'number | string';
    case 'object':
      return 'any';
    case 'boolean':
    case 'string':
      return prop.type;
    case 'array':
      return `${getType(prop.items)}[]`;
    case 'formData':
      return 'FormData';
  }

  if (prop.$ref) {
    let refName = prop.$ref.split('/').pop()
    return refName;
  } else if (prop.allOf && prop.allOf[0].$ref) {
    let refName = prop.allOf[0].$ref.split('/').pop()
    return refName;
  } else {
    return 'any';
  }
}

export function getApiImports(data: any, enums: any) {
  let imports: any[] = []
  let ref;

  if (data.requestBody) {
    ref = getRef(data.requestBody.content);
    if (ref) {
      imports.push(parseApiImport(ref, enums))
    }
  }

  if (data.parameters) {
    data.parameters.forEach(param => {
      ref = getRef(param);
      if (ref) {
        imports.push(parseApiImport(ref, enums))
      }
    })
  }


  let responseContent = (data.responses['200'] || data.responses['201'] || data.responses['204'])?.content || ""
  if (responseContent) {
    let ref = getRef(responseContent);
    if (ref) {
      imports.push(parseApiImport(ref, enums))
    }
  }

  return imports;
}

export function parseApiImport(ref: any, enums: any) {
  if (isEnum(ref, enums)) {
    return `import { ${ref} } from '@/common/enums/${ref}.enum';\n`
  } else {
    return `import { ${ref} } from '@/common/models/${ref}.model';\n`;
  }
}

export function getModelImports(data: any, enums: any, model: any) {

  let imports: any[] = [];
  if (data) {
    Object.keys(data).forEach(key => {
      let ref = getRef(data[key])
      if (ref && model !== ref) {
        if (isEnum(ref, enums)) {
          imports.push(`import { ${ref} } from '@/common/enums/${ref}.enum';\n`)
        } else {
          imports.push(`import { ${ref} } from './${ref}.model';\n`)
        }
      }
    })
  }
  return imports
}

export function isEnum(ref: any, enums: any) {
  let cleanRef = ref.replace(/[\[\]]/g, '')
  return enums && enums.find(enu => enu.name === cleanRef)
}

export function getRef(content: any) {
  if (content['application/json']) {
    return getRef(content['application/json'].schema)
  }

  if (content.allOf) {
    return getRef(content.allOf[0])
  }

  if (content.schema) {
    return getRef(content.schema)
  }

  if (content.type === 'array') {
    return getRef(content.items)
  }

  if (content.$ref) {
    return content.$ref.split('/').pop();
  } else {
    return undefined;
  }
}