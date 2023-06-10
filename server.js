const { ApolloServer } = require('apollo-server')

const typeDefs = `

  type Company {
    companyId: Int
    name: String
    employees: [Employee]
  }

  type Employee {
    employeeId: Int
    companyId: Int
    name: String
    assignments: [Assignment]
  }

  type Assignment {
    assignmentId: Int
    employeeId: Int
    description: String
  }

  type Query {
    companies(companyId: Int): [Company]
  }

  input EmployeeInput {   
    companyId: Int
    name: String
  }

  type Mutation {
    saveCompany(name: String): Company
    saveEmployee(employee: EmployeeInput): Employee
  }
`

const companies = [
  { companyId: 1, name: 'Microsoft' },
  { companyId: 2, name: 'Google' }
]

const employees = [
  { employeeId: 1, companyId: 1, name: 'Brian' },
  { employeeId: 2, companyId: 1, name: 'Rian' },
  { employeeId: 3, companyId: 2, name: 'Jennifer' },
  { employeeId: 4, companyId: 2, name: 'Emma' }
]

const assignments = [
  { assignmentId: 1, employeeId: 1, description: 'IT Infrastructure Management' },
  { assignmentId: 2, employeeId: 1, description: 'Cybersecurity' },
  { assignmentId: 3, employeeId: 2, description: 'Quality assurance' },
  { assignmentId: 4, employeeId: 3, description: 'User experience design' },
  { assignmentId: 5, employeeId: 4, description: 'Software development' },
  { assignmentId: 6, employeeId: 4, description: 'Cloud computing' }
]

const resolvers = {
  Query: {
    companies (obj, args) {     
      return companies.filter(company => !args.companyId || company.companyId === args.companyId);
    }
  },
  Mutation: {
    saveCompany(obj, { name }) {
      const company = { companyId: companies.length + 1, name }
      companies.push(company)
      return company
    },
    saveEmployee(obj, args) {
      const employee = { employeeId: employees.length + 1, ...args}
      employees.push(employee)
      return employee
    }
  },
  Company: {
    employees(obj, args) {
      const companyId = obj.companyId
      return employees.filter(employee => employee.companyId === companyId)
    }
  },
  Employee: {
    assignments(obj, args) {
      const employeeId = obj.employeeId
      return assignments.filter(assignment => assignment.employeeId === employeeId)
    }
  }
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen(3900)