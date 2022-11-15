import { config } from 'yargs';
import { Config } from './index';
import chalk from 'chalk';
import { DTO_File } from '.';
import { uppercaseFirstLetter } from './swagger-utils';

type Enum = {
  name: string
  values: any[]
}

export function extractEnums(jsonData: any, config: Config): DTO_File[] {
  //todo make this path dynamic
  let schemaJSON: any = jsonData.components.schemas;

  console.log(chalk.yellowBright("Parsing enums..."))
  const schemasObjKeys = Object.keys(schemaJSON)
  const enumsNames: string[] = schemasObjKeys.filter(key => schemaJSON[key].enum)
  const enums: Enum[] = enumsNames.map((key: string) => {
    return { name: key, values: schemaJSON[key].enum }
  })

  const filteredEnums = filterEnums(enums, config)

  const enumFilesList: DTO_File[] = filteredEnums.map((en: Enum) => {
    const enumName = uppercaseFirstLetter(en.name)
    let fileContent = `export enum ${enumName} `;
    let enumBodyString = getEnumBody(en);
    fileContent += `{${enumBodyString}\n}`;
    const file = {
      name: en.name,
      content: fileContent
    }
    return file
  })
  return enumFilesList
}

function getEnumBody(en: Enum): string {
  let enumBodyString = "";
  const values = en.values
  values.forEach((enumValue, index) => {
    const valueRow = (!isNaN(enumValue))
      ? ` ${en.name}${enumValue} = \"${enumValue}\"`
      : `  ${enumValue} = \"${enumValue}\"`
    const rowEndChar = index < en.values.length - 1 ? ',' : ""
    enumBodyString += `\n  ${valueRow}${rowEndChar}`
  })
  return enumBodyString;
}

function filterEnums(enumsArr: Enum[], config: Config): Enum[] {
  const { enums } = config
  const { title } = enums
  const { endsWith, startsWith, regex } = title

  if (!endsWith && !startsWith && !regex) {
    return enumsArr
  }

  let rez: Enum[] = [...enumsArr]

  if (endsWith) {
    rez = rez.filter((en) => en.name.endsWith(endsWith))
  }

  if (startsWith) {
    rez = rez.filter((en) => en.name.startsWith(startsWith))
  }

  // if (regex) {
  //   rez = enumsArr.filter((en) => en.name.startsWith(startsWith))
  // }

  return rez
}