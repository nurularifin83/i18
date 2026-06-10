import api from "./axios";

export const getVendors = (page = 1, search = "") => {
  return api.get(`/vendors?page=${page}&search=${search}`);
};

export const createVendor = (data) => api.post("/vendors", data);

export const updateVendor = (id, data) => api.put(`/vendors/${id}`, data);

export const deleteVendor = (id) => api.delete(`/vendors/${id}`);

export const approveVendor = (id) => api.put(`/vendors/${id}/approve`);

export const rejectVendor = (id) => api.put(`/vendors/${id}/reject`);
