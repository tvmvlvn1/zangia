import api from './../../../api/localApi';

export function GetProvidences() {
  return new Promise((resolve, reject) => {
    api
      .get('/ProvidenceDatas')
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

module.exports = {
  GetProvidences,
};
