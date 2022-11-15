import chalk from 'chalk';
import { DTO_File } from '.';
import { getKeysAsArray, lowercaseFirstLetter, uppercaseFirstLetter } from './swagger-utils';

type Model = {
   name: string
   values: any
}


export function extractModels(jsonData: any, enums: DTO_File[]): DTO_File[] {

   let schemaJSON: any = jsonData.components.schemas
   console.log(chalk.yellowBright("Parsing Models..."))

   const schemasObjKeys = Object.keys(schemaJSON)
   const modelNames: string[] = schemasObjKeys.filter(key => schemaJSON[key].type === 'object')

   const models: Model[] = modelNames.map((key: string) => {
      return { name: key, values: schemaJSON[key] }
   })

   const modelFilesList: DTO_File[] = models.map(model => {
      let propertiesList = '';
      let constructor = '\nconstructor(obj = {} as any) {\n  obj = obj || {};';
      let properties = model.values.properties;
      let imports = getModelImports(properties, enums, model.name);

      const importsStr = Array.from(new Set(imports)).join('');

      if (properties) {
         const propertiesArray = getKeysAsArray(properties)
         constructor = getConstructor(propertiesArray, enums);
         propertiesList = getProperties(propertiesArray)
      }
      const modelClassName = uppercaseFirstLetter(model.name.split('.').pop()!)

      let tsContent = `${importsStr}\nexport class ${modelClassName}\n {${propertiesList}${constructor}\n  }\n}`;
      return {
         name: model.name.split('.').pop()!,
         content: tsContent
      };
   });

   return modelFilesList
}

const filterUndefined = ".filter((item: any) => item !== undefined)"

function getConstructor(properties: any[], enums: DTO_File[]): string {
   let constructor = '\n\n  constructor(obj = {} as any) {\n    obj = obj || {};';
   properties.forEach(property => {
      let initValue = getInitValue(property, property.name);
      const notPrimitive = /[A-Z]/.test(getType(property)[0]) && !isEnum(getType(property), enums)
      const propName = lowercaseFirstLetter(property.name)
      const arrayType = getType(property).split('[')[0]

      if (initValue === '[]') {
         const constrPart = `\n    this.${propName} = obj.${propName}`
         let initialization = notPrimitive
            ? `?${filterUndefined}\n      .map((item: any) => new ${arrayType}(item))`
            : ""
         initialization += " || [];"
         constructor += (constrPart + initialization)
      }
      else if ('number' === getType(property)) {
         constructor += `\n    this.${propName} = obj.${propName} !== undefined ` +
            `\n  && obj.${propName} !== null ? obj.${propName} : ${initValue};`;
      }
      else if (notPrimitive) {
         constructor += `\n    this.${propName} = !obj.${propName} ` +
            `\n    ? new ${arrayType}() ` + `\n    : new ${arrayType}(obj.${propName});`;
      }
      else {
         if (initValue !== undefined) {
            let defaultValue = initValue !== 'undefined' ? initValue : '\'\'';
            constructor += `\n    this.${propName} = obj.${propName} === null? ${defaultValue} : obj.${propName};`;
         } else {
            constructor += `\n    this.${propName} = obj.${propName};`;
         }
      }


   });
   return constructor
}


function getModelImports(properties, enums, model) {
   let imports: any[] = [];
   if (properties) {
      Object.keys(properties).forEach(key => {
         let ref = getRef(properties[key])
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


function sp(no: number) {
   let rez = "";
   for (let i = 0; i < no; i++) {
      rez += " "
   }
   return rez
}

function getRef(content) {
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

function getProperties(properties: any[]): string {
   let propertiesList = '';
   properties.forEach(property => {
      const propName = lowercaseFirstLetter(property.name)
      const isNullable = property.nullable ? '?' : ''
      const type = getType(property)
      const initVal = getInitValue(property, property.name)
      propertiesList += `\n  public ${propName}${isNullable}: ${type} = ${initVal};`;
   });
   return propertiesList
}

function getType(prop: any) {
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

function isEnum(ref, enums) {
   let cleanRef = ref.replace(/[\[\]]/g, '')
   return enums && enums.find(enu => enu.name === cleanRef)
}

function getInitValue(prop, name) {
   if (name.toLowerCase().endsWith('guid'))
      return undefined;

   switch (prop.type) {
      case 'integer':
      case 'number':
         return '""';
      case 'string':
         return '""';
      case 'boolean':
         return false;
      case 'array':
         return '[]';
      case 'array':
         return '[]';
   }

   if (prop.$ref) {
      let refName = prop.$ref.split('/').pop()
      return `{} as ${refName}`;
   }

   if (prop.allOf && prop.allOf[0].$ref) {
      let refName = prop.allOf[0].$ref.split('/').pop()
      return `{} as ${refName}`;
   }
}