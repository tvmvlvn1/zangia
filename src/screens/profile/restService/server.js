import api from './../../../api/localApi';

export function GetServer(jwt) {
  return new Promise((resolve, reject) => {
    api
      .get(`/CheckFromErp?jwt=${jwt}`)
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

module.exports = {
  GetServer,
};
