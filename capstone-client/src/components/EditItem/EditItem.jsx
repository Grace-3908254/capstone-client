import React from "react";
import "./EditItem.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import FormError from "../FormError/FormError";

export default function EditItem() {
  const itemId = useParams();
  const navigate = useNavigate();

  const [brand, setBrand] = useState();
  const [citizenship, setCitizenship] = useState();
  const [type, setType] = useState();
  const [nickname, setNickname] = useState();
  const [size, setSize] = useState();
  const [photo, setPhoto] = useState();
  const [preview, setPreview] = useState(null);
  const [birthdate, setBirthdate] = useState();
  const [address, setAddress] = useState();
  const [serialNum, setSerialNum] = useState();
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData(id) {
    try {
      const response = await axios.get(`http://localhost:8080/items/${id}`);
      const Items = response.data;
      setBrand(Items.brand);
      setCitizenship(Items.citizenship);
      setType(Items.type);
      setNickname(Items.nickname);
      setSize(Items.size);
      setPhoto(Items.photo);
      setBirthdate(Items.birthdate);
      const backendDate = new Date(Items.birthdate);
      const formattedDate = backendDate.toISOString().split("T")[0];
      setBirthdate(formattedDate);
      setAddress(Items.address);
      setSerialNum(Items.serial_num);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching item data:", error);
      setError(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData(itemId.id);
  }, [itemId]);

  const handleChangeBrand = (event) => setBrand(event.target.value);
  const handleChangeCitizenship = (event) => setCitizenship(event.target.value);
  const handleChangeType = (event) => setType(event.target.value);
  const handleChangeNickname = (event) => setNickname(event.target.value);
  const handleChangeSize = (event) => setSize(event.target.value);
  const handleChangePhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(file)
      setPhoto(file.name)
      console.log(file.name)
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setFormErrors({
          ...formErrors,
          photo: "File size should not exceed 5MB",
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(e.target)
        setPreview(URL.createObjectURL(e.target.files[0]));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleChangeBirthdate = (event) => setBirthdate(event.target.value);
  const handleChangeAddress = (event) => setAddress(event.target.value);
  const handleChangeSerialNum = (event) => setSerialNum(event.target.value);

  const validateForm = () => {
    const newErrors = {};

    if (brand.trim() === "") newErrors.brand = "Brand is required.";
    if (citizenship.trim() === "")
      newErrors.citizenship = "Citizenship is required.";
    if (type.trim() === "") newErrors.type = "Type is required.";
    if (nickname.trim() === "") newErrors.nickname = "Nickname is required.";
    if (size.trim() === "") newErrors.size = "Size is required.";
    if (!photo) newErrors.photo = "Photo is required.";
    if (birthdate.trim() === "") newErrors.birthdate = "Birthdate is required.";
    if (address.trim() === "") newErrors.address = "Address is required.";
    if (serialNum.trim() === "")
      newErrors.serialNum = "Serial number is required.";

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submit function called");

    if (!validateForm()) {
      setError(true);
      return;
    }

    try {
      const requestBody = {
        citizenship,
        photo,
        brand,
        type,
        nickname,
        size,
        birthdate,
        address,
        serial_num: serialNum,
      };

      console.log("Request body:", requestBody);

      const response = await axios.put(
        `http://localhost:8080/items/${itemId.id}`,
        requestBody
      );

      if (response.status === 200) {
        navigate(-1);
      } else {
        throw new Error("Failed to update item");
      }
    } catch (error) {
      console.error(
        "Unable to update item:",
        error.response ? error.response.data : error.message
      );
      setError(true);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="editItem">
      <form className="editItem__form" onSubmit={handleSubmit}>
        <div className="editItem__form-citizenship">
          <label
            className="editItem__form-label editItem__form-citizenship-label"
            htmlFor="citizenship"
          >
            Citizenship:
          </label>
          <input
            className={`editItem__form-citizenship-input editItem__form-input ${
              formErrors.citizenship ? "editItem__form-input--error" : ""
            }`}
            name="citizenship"
            id="citizenship"
            placeholder="Citizenship"
            onChange={handleChangeCitizenship}
            value={citizenship}
          />
          <FormError errorState={formErrors.citizenship}>
            {formErrors.citizenship}
          </FormError>
        </div>

        <div className="editItem__middle">
          <div className="editItem__form-photo">
            {photo && photo !== "" && (
              <img
              src={preview ? preview : `http://localhost:8080/${photo}`}
                alt="Item"
                className="editItem__form-photo-preview"
              />
            )}
            <label
              className="editItem__form-photo-label editItem__form-label"
              htmlFor="photo"
            >
              Upload A New Photo
            </label>
            <input
              type="file"
              className={`editItem__form-photo-input editItem__form-input ${
                formErrors.photo ? "editItem__form-input--error" : ""
              }`}
              name="photo"
              id="photo"
              accept="image/*"
              onChange={handleChangePhoto}
            />
            <FormError errorState={formErrors.photo}>
              {formErrors.photo}
            </FormError>
          </div>

          <div className="editItem__middle-wordsonly">
            <div className="editItem__form-brand">
              <label
                className="editItem__form-brand-label editItem__form-label"
                htmlFor="brand"
              >
                Brand:
              </label>
              <input
                className={`editItem__form-brand-input editItem__form-input ${
                  formErrors.brand ? "editItem__form-input--error" : ""
                }`}
                list="brandOptions"
                name="brand"
                id="brand"
                placeholder="Brand"
                onChange={handleChangeBrand}
                value={brand}
              />
              <datalist id="brandOptions">
                <option value="Bunnies By The Bay" />
                <option value="Bukowski Bears" />
                <option value="Charlie Bears" />
                <option value="Douglas" />
                <option value="Gund" />
                <option value="Jellycat" />
                <option value="Kaloo" />
                <option value="Maileg" />
                <option value="Moulin Roty" />
                <option value="Mon ami" />
                <option value="Steiff" />
              </datalist>
              <FormError errorState={formErrors.brand}>
                {formErrors.brand}
              </FormError>
            </div>

            <div className="editItem__form-type">
              <label
                className="editItem__form-type-label editItem__form-label"
                htmlFor="type"
              >
                Type:
              </label>
              <input
                className={`editItem__form-type-input editItem__form-input ${
                  formErrors.type ? "editItem__form-input--error" : ""
                }`}
                name="type"
                id="type"
                placeholder="Type"
                onChange={handleChangeType}
                value={type}
              />
              <FormError errorState={formErrors.type}>
                {formErrors.type}
              </FormError>
            </div>

            <div className="editItem__form-nickname">
              <label
                className="editItem__form-nickname-label editItem__form-label"
                htmlFor="nickname"
              >
                Nickname:
              </label>
              <input
                className={`editItem__form-nickname-input editItem__form-input ${
                  formErrors.nickname ? "editItem__form-input--error" : ""
                }`}
                name="nickname"
                id="nickname"
                placeholder="Nickname"
                onChange={handleChangeNickname}
                value={nickname}
              />
              <FormError errorState={formErrors.nickname}>
                {formErrors.nickname}
              </FormError>
            </div>

            <div className="editItem__form-size">
              <label
                className="editItem__form-size-label editItem__form-label"
                htmlFor="size"
              >
                Size:
              </label>
              <input
                className={`editItem__form-size-input editItem__form-input ${
                  formErrors.size ? "editItem__form-input--error" : ""
                }`}
                name="size"
                id="size"
                placeholder="Size"
                onChange={handleChangeSize}
                value={size}
              />
              <FormError errorState={formErrors.size}>
                {formErrors.size}
              </FormError>
            </div>

            <div className="editItem__form-birthdate">
              <label
                className="editItem__form-birthdate-label editItem__form-label"
                htmlFor="birthdate"
              >
                Birthdate:
              </label>
              <input
                className={`editItem__form-birthdate-input editItem__form-input ${
                  formErrors.birthdate ? "editItem__form-input--error" : ""
                }`}
                name="birthdate"
                id="birthdate"
                placeholder="birthdate"
                onChange={handleChangeBirthdate}
                value={birthdate}
                type="date"
              />
              <FormError errorState={formErrors.birthdate}>
                {formErrors.birthdate}
              </FormError>
            </div>

            <div className="editItem__form-address">
              <label
                className="editItem__form-address-label editItem__form-label"
                htmlFor="address"
              >
                Address:
              </label>
              <input
                className={`editItem__form-address-input editItem__form-input ${
                  formErrors.address ? "editItem__form-input--error" : ""
                }`}
                name="address"
                id="address"
                placeholder="Address"
                onChange={handleChangeAddress}
                value={address}
              />
              <FormError errorState={formErrors.address}>
                {formErrors.address}
              </FormError>
            </div>
          </div>
        </div>

        <div className="editItem__form-serialnum">
          <label
            className="editItem__form-serialnum-label editItem__form-label"
            htmlFor="serial_num"
          >
            ID:
          </label>
          <input
            className={`editItem__form-serialnum-input editItem__form-input ${
              formErrors.serialNum ? "editItem__form-input--error" : ""
            }`}
            name="serial_num"
            id="serial_num"
            placeholder="Serial Number"
            onChange={handleChangeSerialNum}
            value={serialNum}
          />
          <FormError errorState={formErrors.serialNum}>
            {formErrors.serialNum}
          </FormError>
        </div>

        <div className="editItem__form-buttons">
          <button
            className="editItem__form-button editItem__form-save"
            type="submit"
          >
            Save
          </button>

          <button
            className="editItem__form-button editItem__form-cancel"
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
