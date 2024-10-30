import React from "react";
import "./AddItem.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import holder from "../../assets/images/empty-headshot.avif";

export default function AddItem() {
  // const [selectOne, setSelectOne] = useState();
  // const itemId = useParams();

  const [brand, setBrand] = useState("");
  const [citizenship, setCitizenship] = useState("");
  const [type, setType] = useState("");
  const [nickname, setNickname] = useState("");
  const [size, setSize] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [serialNum, setSerialNum] = useState("");
  const [error, setError] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

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

      const response = await axios.post(
        "http://localhost:8080/items/add",
        requestBody
      );

      navigate(-1);
    } catch (error) {
      console.error("Unable to add item:", error);
    }
  };

  // //handleSubmit function
  // async function handleSubmit() {
  //   try {
  //     const response = await axios.post(`http://localhost:8080/items/add`);

  //     console.log(response);
  //   } catch (error) {
  //     console, error("Cannot add the fuzzy buddy", error);
  //   }
  // }

  // // selectOneItem() is called in form submit

  return (
    <div className="addItem">
      <form className="addItem__form" onSubmit={handleSubmit}>
        <div className="addItem__form-citizenship">
          <label
            className="addItem__form-label addItem__form-citizenship-label"
            htmlFor="citizenship"
          >
            Citizenship:
          </label>
          <input
            className={`addItem__form-citizenship-input addItem__form-input ${
              error && !citizenship ? "addItem__form-input--error" : ""
            }`}
            name="citizenship"
            id="citizenship"
            placeholder="Citizenship"
            onChange={(e) => setCitizenship(e.target.value)}
            value={citizenship}
          />
          {error && !citizenship && (
            <span className="error-message">This field is required</span>
          )}
        </div>

        <div className="addItem__middle">
          <div className="addItem__form-photo">
            <img
              src={preview ? preview : holder}
              alt="Item"
              className="addItem__form-photo-preview"
            />
            <label
              className="addItem__form-photo-label  addItem__form-label"
              htmlFor="photo"
            >
              Upload A Headshot
            </label>
            <input
              type="file"
              className={`addItem__form-photo-input addItem__form-input ${
                error && !photo ? "addItem__form-input--error" : ""
              }`}
              name="photo"
              id="photo"
              accept="image/*"
              onChange={(e) => {
                setPhoto(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
            {error && !photo && (
              <span className="error-message">This field is required</span>
            )}
          </div>

          <div className="addItem__middle-wordsonly">
            <div className="addItem__form-brand">
              <label
                className="addItem__form-brand-label addItem__form-label"
                htmlFor="brand"
              >
                Brand:
              </label>
              <input
                list="brandOptions"
                className={`addItem__form-brand-input addItem__form-input ${
                  error && !brand ? "addItem__form-input--error" : ""
                }`}
                name="brand"
                id="brand"
                placeholder="Enter a brand"
                onChange={(e) => setBrand(e.target.value)}
                value={brand}
                required // Make this field required
              />
              <datalist id="brandOptions">
                <option value="Bunnies By The Bay" />
                <option value="Bukowski Bears" />
                <option value="Charlie Bears" />
                <option value="Douglas" />
                <option value="Gunt" />
                <option value="Jellycat" />
                <option value="Kaloo" />
                <option value="Maileg" />
                <option value="Moulin Roty" />
                <option value="Mon ami" />
                <option value="Steiff" />
              </datalist>
              {error && !brand && (
                <span className="error-message">This field is required</span>
              )}
            </div>

            <div className="addItem__form-type">
              <label
                className="addItem__form-type-label addItem__form-label"
                htmlFor="type"
              >
                Type:
              </label>
              <input
                className={`addItem__form-type-input addItem__form-input ${
                  error && !type ? "addItem__form-input--error" : ""
                }`}
                name="type"
                id="type"
                placeholder="Type"
                onChange={(e) => setType(e.target.value)}
                value={type}
              />
              {error && !type && (
                <span className="error-message">This field is required</span>
              )}
            </div>

            <div className="addItem__form-nickname">
              <label
                className="addItem__form-nickname-label addItem__form-label"
                htmlFor="nickname"
              >
                Nickname:
              </label>
              <input
                className={`addItem__form-nickname-input addItem__form-input ${
                  error && !nickname ? "addItem__form-input--error" : ""
                }`}
                name="nickname"
                id="nickname"
                placeholder="Nickname"
                onChange={(e) => setNickname(e.target.value)}
                value={nickname}
              />
              {error && !nickname && (
                <span className="error-message">This field is required</span>
              )}
            </div>

            <div className="addItem__form-size">
              <label
                className="addItem__form-size-label addItem__form-label"
                htmlFor="size"
              >
                Size:
              </label>
              <input
                className={`addItem__form-size-input addItem__form-input ${
                  error && !size ? "addItem__form-input--error" : ""
                }`}
                name="size"
                id="size"
                placeholder="Size"
                onChange={(e) => setSize(e.target.value)}
                value={size}
              />
              {error && !size && (
                <span className="error-message">This field is required</span>
              )}
            </div>

            <div className="addItem__form-birthdate">
              <label
                className="addItem__form-birthdate-label addItem__form-label"
                htmlFor="birthdate"
              >
                Birthdate:
              </label>
              <input
                className={`addItem__form-birthdate-input addItem__form-input ${
                  error && !birthdate ? "addItem__form-input--error" : ""
                }`}
                name="birthdate"
                id="birthdate"
                placeholder="Birthdate"
                onChange={(e) => setBirthdate(e.target.value)}
                value={birthdate}
                type="date"
              />
              {error && !birthdate && (
                <span className="error-message">This field is required</span>
              )}
            </div>

            <div className="addItem__form-address">
              <label className="addItem__form-label" htmlFor="address">
                Address:
              </label>
              <input
                className={`addItem__form-address-input addItem__form-input ${
                  error && !address ? "addItem__form-input--error" : ""
                }`}
                name="address"
                id="address"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
              {error && !address && (
                <span className="error-message">This field is required</span>
              )}
            </div>
          </div>
        </div>

        <div className="addItem__form-serialnum">
          <label
            className="addItem__form-serialnum-label addItem__form-label"
            htmlFor="serial_num"
          >
            ID:
          </label>
          <input
            className={`addItem__form-serialnum-input addItem__form-input ${
              error && !serialNum ? "addItem__form-input--error" : ""
            }`}
            name="serial_num"
            id="serial_num"
            placeholder="Serial Number"
            onChange={(e) => setSerialNum(e.target.value)}
            value={serialNum}
          />
          {error && !serialNum && (
            <span className="error-message">This field is required</span>
          )}
        </div>

        <div className="addItem__form-buttons">
          <button
            className="addItem__form-button addItem__form-save"
            type="submit"
          >
            Add Item
          </button>
          <button
            className="addItem__form-button addItem__form-cancel"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
