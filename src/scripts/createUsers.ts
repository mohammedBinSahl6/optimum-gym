import { $Enums } from "@prisma/client";

const mocks = [
  {
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    password: "password123",
    accepted: false,
    role: "MEMBER",
  },
  {
    firstname: "Jane",
    lastname: "Smith",
    email: "jane.smith@example.com",
    password: "securepass456",
    accepted: false,
    role: "ADMIN",
  },
  {
    firstname: "Michael",
    lastname: "Johnson",
    email: "michael.j@example.com",
    password: "mikepass789",
    accepted: false,
    role: "COACH",
  },
  {
    firstname: "Emily",
    lastname: "Williams",
    email: "emily.w@example.com",
    password: "emilypass321",
    accepted: false,
    role: "MEMBER",
  },
  {
    firstname: "David",
    lastname: "Brown",
    email: "david.b@example.com",
    password: "davidpass654",
    accepted: false,
    role: "MEMBER",
  },
  {
    firstname: "Sarah",
    lastname: "Miller",
    email: "sarah.m@example.com",
    password: "sarahpass987",
    accepted: false,
    role: "COACH",
  },
  {
    firstname: "Robert",
    lastname: "Wilson",
    email: "robert.w@example.com",
    password: "robertpass123",
    accepted: false,
    role: "ADMIN",
  },
  {
    firstname: "Jennifer",
    lastname: "Taylor",
    email: "jennifer.t@example.com",
    password: "jennpass456",
    accepted: false,
    role: "MEMBER",
  },
  {
    firstname: "Thomas",
    lastname: "Anderson",
    email: "thomas.a@example.com",
    password: "thomaspass789",
    accepted: false,
    role: "MEMBER",
  },
  {
    firstname: "Lisa",
    lastname: "Jackson",
    email: "lisa.j@example.com",
    password: "lisapass321",
    accepted: false,
    role: "COACH",
  },
  {
    firstname: "William",
    lastname: "White",
    email: "william.w@example.com",
    password: "willpass654",
    accepted: false,
    role: "MEMBER",
  },
  {
    firstname: "Jessica",
    lastname: "Harris",
    email: "jessica.h@example.com",
    password: "jesspass987",
    accepted: false,
    role: "ADMIN",
  },
  {
    firstname: "Daniel",
    lastname: "Martin",
    email: "daniel.m@example.com",
    password: "danpass123",
    accepted: false,
    role: "MEMBER",
  },
  {
    firstname: "Amanda",
    lastname: "Thompson",
    email: "amanda.t@example.com",
    password: "amandapass456",
    accepted: false,
    role: "COACH",
  },
  {
    firstname: "Christopher",
    lastname: "Garcia",
    email: "chris.g@example.com",
    password: "chrispass789",
    accepted: false,
    role: "MEMBER",
  },
  {
    firstname: "Ashley",
    lastname: "Martinez",
    email: "ashley.m@example.com",
    password: "ashleypass321",
    accepted: false,
    role: "MEMBER",
  },
  {
    firstname: "Matthew",
    lastname: "Robinson",
    email: "matthew.r@example.com",
    password: "mattpass654",
    accepted: false,
    role: "ADMIN",
  },
  {
    firstname: "Elizabeth",
    lastname: "Clark",
    email: "elizabeth.c@example.com",
    password: "elizpass987",
    accepted: false,
    role: "MEMBER",
  },
  {
    firstname: "James",
    lastname: "Rodriguez",
    email: "james.r@example.com",
    password: "jamespass123",
    accepted: false,
    role: "COACH",
  },
  {
    firstname: "Nicole",
    lastname: "Lewis",
    email: "nicole.l@example.com",
    password: "nicolepass456",
    accepted: false,
    role: "MEMBER",
  },
];
export async function createUsers() {
  try {
    mocks.forEach(async(mock) => {
      console.log("Started creating mock data");
       await prisma.user.create({
        data: {
          firstName: mock.firstname,
          lastName: mock.lastname,
          email: mock.email,
          password: mock.password,
          role: mock.role as $Enums.Role,
        },
      });
    });
    console.log("Mock data created successfully");
  } catch (error) {
    console.log(error);
  }
}
