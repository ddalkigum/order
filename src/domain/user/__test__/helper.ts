import { encryptWithSHA256 } from '../../../util/crypto';

export const testHelper = {
  tableName: 'user_test',

  repository: {
    userData: {
      phone_number: '01011112222',
      nickname: 'testNickname',
      encrypted_ci: encryptWithSHA256('testCI'),
    },

    userDataForUpdate: {
      phone_number: '01011113333',
      nickname: 'testNickname',
      encrypted_ci: encryptWithSHA256('testCI'),
    },
  },

  router: {
    userData: {
      phoneNumber: '01011112222',
      nickname: 'testNickname',
      ci: 'testCI',
    },

    userDataForUpdate: {
      phoneNumber: '01011113333',
      nickname: 'testNickname',
      ci: 'testCI',
    },
  },
};
