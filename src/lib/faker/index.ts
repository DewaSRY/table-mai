import { faker } from "@faker-js/faker";

export function createRandomUser() {
  return {
    profile: faker.image.avatar(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int({ max: 70 }),
    visited: faker.number.int({ max: 10000 }),
    progress: faker.number.int({ max: 100 }),
  };
}

export type UsersProps = ReturnType<typeof createRandomUser>;
const Users = faker.helpers.multiple(createRandomUser, {
  count: 50,
});

export default Users;
