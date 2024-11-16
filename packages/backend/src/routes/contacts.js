import { 
  insertContact, 
  selectContacts, 
  updateContact, 
  deleteContact as deleteContactDrizzle, 
  checkDuplicate, 
  selectContact} from "../db"

async function getContacts(request, reply) {
  const result = await selectContacts()
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
  const updateData = request.body

  // Check if id exists
  let result = await selectContact(id)
  if (result.length > 0) {

    // Check duplicate
    const duplicate = await checkDuplicate({id, ...updateData})
    if (!duplicate) {

      result = await updateContact(id, request.body)
      return { result: result[0] }

      
    } else {
      reply.code(400).send({ error: "Contact already exists" })
    }

  } else {
    reply.code(404).send({ error: 'Contact not found' })
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
