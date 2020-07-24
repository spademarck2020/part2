import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getContacts = () =>{
    const request = axios.get(baseUrl)
    return request.then(response => {
        console.log('this is from get',response.data)
        return response.data})
}

const addContact = newObject =>{
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const removeContact = id =>{
    return axios.delete(`${baseUrl}/${id}`)
}

const updateContact = (id,newObject) =>{
    const request = axios.put(`${baseUrl}/${id}`,newObject)
    return request.then(response => response.data)
}

export default { getContacts, addContact, removeContact, updateContact }