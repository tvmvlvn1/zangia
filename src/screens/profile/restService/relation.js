import api from './../../../api/localApi';

export function ShowRelationData(jwt, id) {
  return new Promise((resolve, reject) => {
    api
      .get(`/ViewDependentMember?jwt=${jwt}&dmember=${id}`)
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

export function InsertRelation(jwt, data) {
  return new Promise((resolve, reject) => {
    api
      .get(
        `/AddDependentMember?jwt=${jwt}&first_name=${data.first_name}&last_name=${data.last_name}&contact_number=${data.contact_number}&department=${data.department}&job_position=${data.job_position}&dropdown_list_id=${data.dropdown_list_id}&relation_name=${data.relation_name}`,
      )
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

export function UpdateRelation(jwt, data, id) {
  return new Promise((resolve, reject) => {
    api
      .put(
        `/EditDependentMember?dmember=${id}&jwt=${jwt}&first_name=${data.first_name}&last_name=${data.last_name}&contact_number=${data.contact_number}&department=${data.department}&job_position=${data.job_position}&dropdown_list_id=${data.dropdown_list_id}&relation_name=${data.relation_name}`,
      )
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

export function DropRelation(jwt, id) {
  return new Promise((resolve, reject) => {
    api
      .delete(`/DeleteDependentMember?jwt=${jwt}&dmember=${id}`)
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

export function RelationList(jwt) {
  return new Promise((resolve, reject) => {
    api
      .get(`/ViewAllDependentMembers?jwt=${jwt}`, {
        params: {
          jwt: jwt,
        },
      })
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

module.exports = {
  ShowRelationData,
  InsertRelation,
  UpdateRelation,
  DropRelation,
  RelationList,
};
