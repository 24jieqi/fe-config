/* eslint-disable @typescript-eslint/no-require-imports */
const fetch = require('node-fetch')

async function fetchRemoteSchemaTypeDefs(url) {
  let timer
  const response = await Promise.race([
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        query sdl {
             _service {
                sdl
               }
            }
         `,
      }),
    }),
    new Promise(function (_, reject) {
      timer = setTimeout(() => reject(new Error('request timeout')), 15000)
    }),
  ])

  clearTimeout(timer)
  const { data } = await response.json()
  const backendTypeDefs = data._service.sdl
  return backendTypeDefs
}

async function plugin(schema, documents, config) {
  const backendTypeDefs = await fetchRemoteSchemaTypeDefs(config.url)
  return backendTypeDefs
}

exports.plugin = plugin

const addToSchema = `
    directive @mock(
      enable: Boolean
      val: NumberOrBoolOrStringOrNull
      len: NumberOrString
      fallback: Boolean
      err: GraphqlError
    ) on FIELD | QUERY | MUTATION
    input GraphqlError {
      code: Int!
      message: String!
    }
    scalar NumberOrBoolOrStringOrNull
    scalar NumberOrString
  `

exports.addToSchema = addToSchema
