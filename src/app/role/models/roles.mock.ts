import { Role } from '../types/role.interface';

export const ROLES_MOCK: Role[] = <Role[]>[
    {
        _id: 'a06f3b98-2a33-458a-9abd-238bede21c94',
        name: 'Super-administrateur',
        privileges: [
            {
                _id: 'c6fc411c-eb91-4a8e-bcee-9be98671fed1',
                name: 'VIEW_CONTACT',
                category: 'CONTACT'
            },
            {
                _id: '6dbe358e-d55b-4a1b-9381-96723a8076ed',
                name: 'EDIT_CONTACT',
                category: 'CONTACT'
            },
            {
                _id: '0a244d46-bc1a-40d7-b891-9cdaf31be0ef',
                name: 'DELETE_CONTACT',
                category: 'CONTACT'
            },
            {
                _id: '0a244d46-bc1a-40d7-b891-9cdaf31be100',
                name: 'VIEW_USER',
                category: 'USER'
            },
            {
                _id: '0a244d46-bc1a-40d7-b891-9cdaf31be101',
                name: 'CREATE_USER',
                category: 'USER'
            },
            {
                _id: '0a244d46-bc1a-40d7-b891-9cdaf31be102',
                name: 'EDIT_USER',
                category: 'USER'
            },
            {
                _id: '0a244d46-bc1a-40d7-b891-9cdaf31be103',
                name: 'DELETE_USER',
                category: 'USER'
            },
            {
                _id: '0a244d46-bc1a-40d7-b891-9cdaf31be104',
                name: 'VIEW_ROLE',
                category: 'ROLE'
            },
            {
                _id: '0a244d46-bc1a-40d7-b891-9cdaf31be105',
                name: 'CREATE_ROLE',
                category: 'ROLE'
            },
            {
                _id: '0a244d46-bc1a-40d7-b891-9cdaf31be106',
                name: 'EDIT_ROLE',
                category: 'ROLE'
            },
            {
                _id: '0a244d46-bc1a-40d7-b891-9cdaf31be107',
                name: 'DELETE_ROLE',
                category: 'ROLE'
            }
        ]
    }
];
