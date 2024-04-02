import api from './../../../api/localApi';

export function GetAddress(jwt) {
  return new Promise((resolve, reject) => {
    api
      .get(`/GetAddress?jwt=${jwt}`)
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

export function ChangeAddress(jwt, data) {
  return new Promise((resolve, reject) => {
    api
      .get(
        `/ChangeAddress?jwt=${jwt}&district_id=${data.NowProvidence}&suburb_id=${data.NowSoum}&toot=${data.NowToot}`,
      )
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

module.exports = {
  GetAddress,
  ChangeAddress,
};
