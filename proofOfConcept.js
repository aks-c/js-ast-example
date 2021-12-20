import { cloneDeep, map } from "lodash-es";
import fs from "fs";
import * as espree from "espree";
import escodegen from "escodegen";

/**
 * Here's the gist of what we do:
 * - Change a string to an AST (with 'espree')
 * - Modify that AST
 * - change that ASt back to a string (with 'escodegen')
 *
 * Note: What's an AST?
 * AST means 'Abstract Syntaxt Tree',
 * and it's a description of our source code
 * as a graph that you can manipulate.
 */
export function proofOfConcept(array) {
    const astElementList = map(array, (el) => {
        // See https://astexplorer.net/ for exact object structures.
        return {
            "type": "Literal",
            "start": 36,
            "end": 39,
            "value": el,
            "raw": `'${el}'`
        }
    })

    const initialScriptString = fs.readFileSync("myJsFile.js", 'utf8');

    // Amazing website to explore ASTs (and understand this output):
    // https://astexplorer.net/
    const initialAst = espree.parse(initialScriptString, { ecmaVersion: 6 });

    let newAst = cloneDeep(initialAst);
    newAst
        ['body'][0]['expression']['body']
        ["body"][0]
        ["declarations"][0]["init"]["elements"]
        = astElementList;

    return escodegen.generate(newAst);
}