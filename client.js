const axios = require('axios')

const execute = async function (data) {
  try {
    const response = await axios({
      url: 'http://localhost:3900',
      method: 'post',
      data
    })

    const result = response.data
    console.log(JSON.stringify(result, undefined, ' '))
  } catch (e) {
    console.log(e)
  }
};

(async function () {

  console.log('GET ALL COMPANIES')

  await execute({
    query: 
      `query {
        companies {
          companyId
          name
          employees {
            name
            roles: assignments {
              description
            }
          }
        }
      }`
  })
    
  console.log('\n\nGET ONE COMPANY')

  await execute({
    query: 
      `query {
        companies (companyId: 2) {
          name
          employees {
            name
          }
        }
      }`
  })    

  console.log('\n\nCREATE NEW COMPANY')

  await execute({
    query: 
      `mutation {
        saveCompany (name: "Amazon") {
          companyId
          name
        }
      }`
    })    

  console.log('\n\nCREATE NEW EMPLOYEE')

  await execute({
    query: `
      mutation ($employee: EmployeeInput) {
        saveEmployee (employee: $employee) {
          employeeId
          companyId
          name
        }
      }`,
    variables: {
      employee: {
        companyId: 1,
        name: 'Anne'
      }
    }
  })    

})();


