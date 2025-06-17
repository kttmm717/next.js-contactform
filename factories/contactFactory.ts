import { Faker, ja, en } from "@faker-js/faker";


const faker = new Faker({ locale: [ja, en] });

export function fakeContact() {
    return {
        category_id: faker.number.int({min:1, max:5}),
        name: faker.person.fullName(),
        gender: faker.helpers.arrayElement(['男性', '女性', 'その他']),
        email: faker.internet.email(),
        tel: faker.phone.number(),
        address: faker.location.streetAddress(),
        building: faker.location.secondaryAddress(),
        content: faker.lorem.paragraph(),
        create_at: faker.date.recent(),
    };
}