import mkdirp from 'mkdirp';
import rimraf from 'rimraf';

import * as yargs from 'yargs';
import * as path from 'path';
import * as fs from 'fs';
import chalk from 'chalk';
import { extractEnums } from './extract-enums';
import { extractModels } from './extract-models';
import { extractApis } from './extract-apis';

const getDirName = path.dirname

const ROOT = "src";
const ENUMS = "common/enums";
const MODELS = "common/models";
const APIS = "api/endpoints";
const argv = yargs.argv
let host = `localhost:41000`;
let apis: API[] = [{
  name: '',
  path: '/swagger/v1/swagger.json'
}]

export type DTO_File = {
  name: string,
  content: string
}

type API = {
  enums?: any
  name: any
  path: string
  models?: any
  content?: any
}

function readFile(path: any): string | undefined {
  try {
    const data = fs.readFileSync(path, 'utf8');
    return (data)

  } catch (err) {
    return (undefined)
  }
}

function writeFiles(ROOT: string, PATH: string, fileType: string, files: DTO_File[]): void {
  rimraf.sync(`${ROOT}/${PATH}`)
  mkdirp.sync(`${ROOT}/${PATH}`);
  files.forEach(en => {
    writeFile(`${ROOT}/${PATH}/${en.name}.${fileType}`, en.content)
  })
}

function writeFile(path: string, data: any) {
  console.log(chalk.green(`Created File : ${path}`))
  mkdirp(getDirName(path)).then(() => {
    fs.writeFileSync(path, data);
  })
}

function run() {
  const data = readFile("./tools/swagger/swagger.json");

  if (!data) {
    throw new Error("not good")
  }
  const parsed = JSON.parse(data);

  if (!parsed) {
    throw new Error("not good")
  }

  const enums = extractEnums(parsed)
  writeFiles(ROOT, ENUMS, "enum.ts", enums)

  const models = extractModels(parsed, enums)
  writeFiles(ROOT, MODELS, "model.ts", models)

  //TODO implement Result design pattern here for every API
  const apis = extractApis(parsed, "explorer", enums)
  writeFiles(ROOT, APIS, "api.ts", apis)
}



run()


