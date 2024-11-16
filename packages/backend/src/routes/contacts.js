import { desc } from "drizzle-orm"
import { insertContact, selectContacts, updateContact, deleteContact as deleteContactDrizzle, checkDuplicate } from "../db"
import { contactsTable } from "../db/schema"

async function getContacts(request, reply) {
  const { sort, page } = request.query
  let sortOptions = [], pagination = 1, result

  // Check for sort parameter in query string
  if (sort) {

    // Check for existence of parameter in pgTable
    const col = contactsTable[sort]
    if (col) {

      // Check for descending option
      if (sort[0] === "-") {
        sortOptions = [desc(col)]
      } else {
        sortOptions = [col]
      }
    }
  }

  if (page) {
    pagination = parseInt(page)
  }

  if (sortOptions.length > 0) {
    result = await selectContacts(pagination, sortOptions)
  } else {
    result = await selectContacts(pagination)
  }

  return { result }
}

async function postContacts(request, reply) {
  const contact = request.body
  const duplicate = await checkDuplicate(contact)
  if (duplicate) {
    reply.code(400).send({ error: "Contact already exists" })
  } else {
    const result = await insertContact(contact)
    return { result }
  }
}

async function putContacts(request, reply) {
  const { id } = request.params
  const result = await updateContact(id, request.body)
  if (result.length > 0) {
    return { result: result[0] }
  } else {
    reply.code(404)
      .send({ error: 'Contact not found' })
  }
}

async function deleteContact(request, reply) {
  const { id } = request.params
  const result = await deleteContactDrizzle(id)
  if (result.length > 0) {
    return { result: result[0] }
  } else {
    reply.code(404)
      .send({ error: 'Contact not found' })
  }
}

export const contacts = (fastify, _, done) => {
  fastify.get('/', getContacts)
  fastify.post('/', postContacts)
  fastify.put('/:id', putContacts)
  fastify.delete('/:id', deleteContact)

  done()
}
