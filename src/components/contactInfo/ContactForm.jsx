import "./contactForm.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import axios from "axios";

function ContactInfo({
  setDeliverData,
  deliverData,
  setDeliverPrice,
  formRef,
  setUserInfo,
  userInfo,
  pay,
}) {
  const [selectedOption, setSelectedOption] = useState();

  const schema = yup.object({
    name: yup.string().required("სავალდებულო ველი"),
    phone: yup.string().required("სავალდებულო ველი"),
    address: yup.string().required("სავალდებულო ველი"),
    zone: yup.string().required("უბნის არჩევა სავალდებულოა"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(
          `https://misho.pythonanywhere.com/api/order/address/`
        );
        setDeliverData(response.data);
      } catch (error) {}
    };

    fetchAddresses();
  }, []);

  const getDeliverPrice = (streetName) => {
    setSelectedOption(streetName);

    const selectedStreet = deliverData.find(
      (street) => street.name === streetName
    );
    if (selectedStreet) {
      setDeliverPrice((prevValue) => ({
        ...prevValue,
        price: selectedStreet.price,
        id: selectedStreet.id,
      }));
    }
  };
  useEffect(() => {
    if (userInfo.full_name && userInfo.phone_number && userInfo.address) {
      pay();
    }
  }, [userInfo]);
  const handleSubmited = (data) => {
    setUserInfo((prevValue) => ({
      ...prevValue,
      full_name: data.name,
      phone_number: data.phone,
      address: data.address,
    }));
  };

  return (
    <div className="contactFormContainer">
      <div className="contactContent">
        <form
          className="contactForm"
          onSubmit={handleSubmit((data) => handleSubmited(data))}
          ref={formRef}
        >
          {" "}
          <div className="adrress">
            {" "}
            <select
              {...register("zone")}
              value={selectedOption}
              onChange={(e) => getDeliverPrice(e.target.value)}
              name="zone"
            >
              <option value="">აირჩიეთ სასურველი უბანი</option>
              {deliverData.map((data, index) => (
                <option key={index} value={data.name}>
                  {data.name}
                </option>
              ))}
            </select>
            {errors.zone && <p className="error">{errors.zone.message}</p>}
          </div>
          <div className="adrress">
            <input
              type="text"
              placeholder="მაგ:ჭავჭავაძის გამზირი, სადარბაზო 1, სართული 2, ბინა 5*"
              name="address"
              {...register("address")}
            ></input>
            {errors.address && (
              <p className="error">{errors.address.message}</p>
            )}
          </div>
          <div className="personalInfo">
            <div className="name">
              <input
                type="text"
                name="name"
                placeholder="სახელი და გვარი"
                {...register("name")}
              ></input>
              {errors.name && <p className="error">{errors.name.message}</p>}
            </div>
            <div className="phone">
              <input
                name="phone"
                placeholder="მობილურის ნომერი"
                type="text"
                {...register("phone")}
              ></input>
              {errors.phone && <p className="error">{errors.phone.message}</p>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ContactInfo;
