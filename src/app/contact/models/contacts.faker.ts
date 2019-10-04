import * as faker from 'faker';
import { Contact } from '../types/contact.interface';

const NB_CONTACT = 100;

export const contacts: Contact[] = Array.from(
    new Array(NB_CONTACT),
    (): Contact => ({
        id: faker.random.uuid(),
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        address: faker.address.streetAddress(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        favorite: faker.random.boolean()
    })
);
