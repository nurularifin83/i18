import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import {
  getVendors,
  createVendor,
  updateVendor,
  deleteVendor,
  approveVendor,
  rejectVendor,
} from "../api/vendorApi";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

function Vendor() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [vendors, setVendors] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const { token } = useAuth();

  // Get data
  const loadVendors = async () => {
    try {
      setLoading(true);

      const response = await getVendors(currentPage, search);

      console.log(`TOKEN BRO: ${token}`);
      setVendors(response.data.data);
      setLastPage(response.data.last_page);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVendors();
  }, [currentPage, search]);

  // Add Vendor
  const handleCreateVendor = async (data) => {
    try {
      await createVendor({
        vendor_name: data.vendor_name,
        email: data.email,
        status: "Pending",
      });

      toast.success("Vendor created successfully");

      reset();

      loadVendors();
    } catch (error) {
      toast.error("Failed to create vendor");
      console.error(error);
    }
  };

  // Delete vendor
  const handleDeleteVendor = async (id) => {
    try {
      await deleteVendor(`${id}`);
      toast.success("Vendor deleted successfully");

      loadVendors();
    } catch (error) {
      toast.error("Operation failed");
      console.error(error);
    }
  };

  //Update vendor
  const editVendor = (vendor) => {
    try {
      setEditId(vendor.id);

      setValue("vendor_name", vendor.vendor_name);
      setValue("email", vendor.email);
    } catch (error) {
      toast.error("Operation failed");
      console.error(error);
    }
  };

  const handleUpdateVendor = async () => {
    try {
      const data = getValues();

      await updateVendor(editId, {
        vendor_name: data.vendor_name,
        email: data.email,
        status: "Pending",
      });

      toast.success("Vendor updated successfully");

      setEditId(null);
      reset();

      loadVendors();
    } catch (error) {
      toast.error("Operation failed");
      console.error(error);
    }
  };

  // Approve
  const handleApproveVendor = async (id) => {
    try {
      await approveVendor(id);

      toast.success("Vendor approved successfully");

      loadVendors();
    } catch (error) {
      toast.error("Operation failed");
      console.error(error);
    }
  };

  // Rejected
  const handleRejectVendor = async (id) => {
    try {
      await rejectVendor(id);

      toast.success("Vendor rejected successfully");

      loadVendors();
    } catch (error) {
      toast.error("Operation failed");
      console.error(error);
    }
  };

  return (
    <MainLayout>
      <h1>{t("vendor.title")}</h1>

      <h2>{t("vendor.subtitle")}</h2>

      <form onSubmit={handleSubmit(handleCreateVendor)}>
        <input
          placeholder={t("vendor.name")}
          {...register("vendor_name", {
            required: "Vendor Name is required",
          })}
        />

        {errors.vendor_name && <p>{errors.vendor_name.message}</p>}

        <br />

        <input
          placeholder={t("vendor.email")}
          {...register("email", {
            required: "Email is required",
          })}
        />

        {errors.email && <p>{errors.email.message}</p>}

        <br />

        {editId ? (
          <button type="button" onClick={handleUpdateVendor}>
            {t("vendor.button.create")}
          </button>
        ) : (
          <button type="submit">{t("vendor.button.update")}</button>
        )}
      </form>

      <hr />

      <input
        type="text"
        placeholder={t("vendor.search")}
        value={search}
        onChange={(e) => {
          setCurrentPage(1);
          setSearch(e.target.value);
        }}
      />
      <br />
      <br />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Vendor Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor.id}>
                <td>{vendor.id}</td>
                <td>{vendor.vendor_name}</td>
                <td>{vendor.email}</td>
                <td>{vendor.status}</td>
                <td>
                  <button onClick={() => editVendor(vendor)}>
                    {t("vendor.edit")}
                  </button>

                  <button onClick={() => handleDeleteVendor(vendor.id)}>
                    {t("vendor.delete")}
                  </button>

                  <button onClick={() => handleApproveVendor(vendor.id)}>
                    {t("vendor.approve")}
                  </button>

                  <button onClick={() => handleRejectVendor(vendor.id)}>
                    {t("vendor.reject")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          {t("vendor.previous")}
        </button>

        <span>
          {t("vendor.page")} {currentPage} {t("vendor.of")} {lastPage}
        </span>

        <button
          disabled={currentPage === lastPage}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          {t("vendor.next")}
        </button>
      </div>
    </MainLayout>
  );
}

export default Vendor;
