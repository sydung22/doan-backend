import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "../../components/menu/menu";
import { onUpdate } from "../../api/updateUser";
import "./setting.scss";
import Cookies from "js-cookie";
import { setLocal } from "../../api/localSet";

function Setting(props) {
  const [username, setUN] = useState(localStorage.getItem("username"));
  const [fullname, setFN] = useState(localStorage.getItem("fullname"));
  const [description, setDes] = useState(localStorage.getItem("description"));
  const [facebook, setFb] = useState(localStorage.getItem("facebook"));
  const [age, setAge] = useState(localStorage.getItem("age"));
  const [gender, setGender] = useState(localStorage.getItem("gender"));
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar"));

  //set file
  const [file, setFile] = useState("");
  const [fix_avatar, setFix] = useState(null);
  // change file
  const [changeFile, setChange] = useState("disable");
  const [upload_img, setUpload] = useState("disable");

  //check valid
  const [check1, setCheck1] = useState("disable");
  const [check2, setCheck2] = useState("disable");

  // set clear data
  const [clear, setClear] = useState("disable");

  // set alert
  const [success, setSuccess] = useState("disable");
  const [fail, setFail] = useState("disable");

  useEffect(() => {
    //console.log(localStorage);
    //console.log(file);
    document.title = "Tiktok - Setting";
  }, []);

  const updateData = () => {
    if (username.length < 6) {
      setCheck1("");
    } else {
      setCheck1("disable");
      if (fullname.split(" ").length < 2) {
        setCheck2("");
      } else {
        setCheck2("disable");
        const data = {
          id: localStorage.getItem("id"),
          username: username,
          fullname: fullname,
          description: description,
          facebook: facebook,
          age: age,
          gender: gender,
          avatar: avatar,
        };
        console.log(data);
        onUpdate(data).then((res) => {
          //console.log(res);
          if (res.data.alert == 200) {
            setSuccess("success");
            setTimeout(() => {
              setSuccess("disable");
            }, 1000);
            Cookies.set("user", res.data);
            setLocal(res.data);
            window.location.href = "/";
          } else {
            setFail("fail");
            setTimeout(() => {
              setFail("disable");
            }, 1000);
          }
        });
      }
    }
  };

  const uploadAvatar = () => {
    var x = document.getElementById("upload--file");
    x.click();
  };

  const uploadImg = (file) => {
    console.log(file);
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "upload_image");
    axios
      .post("https://api.cloudinary.com/v1_1/diw0u2vl1/image/upload", form)
      .then((response) => {
        //console.log(response);
        setAvatar(response.data.url);
        setFix(response.data.url);
      });
  };

  return (
    <div className="setting">
      <Menu lang={props.lang} />
      <div className="setting--container">
        <div className="setting--main">
          <h1>Ch???nh s???a th??ng tin</h1>
          <p>Ch???nh s???a th??ng tin c?? nh??n c???a b???n</p>
          <div className="setting--main--child">
            <div className="setting--upload--file" onClick={() => uploadAvatar()}>
              <p>Ch???n ???nh t??? thi???t b??? c???a b???n(PNG, WEBP, JPEG)</p>
              <input
                type="file"
                hidden
                id="upload--file"
                accept="image/png, image/jpeg, image/webp, image/jpg"
                onChange={(e) => {
                  setFile(e.target.files[0].name);
                  uploadImg(e.target.files[0]);
                  setChange("change--file");
                  setUpload("img--upload");
                }}
              />
              <button className="setting--btn--upload">Choosen a file</button>
              <div className={changeFile}>
                <h2 className="file--name">{file}</h2>
                <h2 className="change">Thay ?????i avatar</h2>
              </div>
              <img className={upload_img} src={fix_avatar} alt="" />
            </div>
            <div className="setting--upload--form">
              <label>Username</label>
              <br />
              <input
                type="text"
                required
                defaultValue={localStorage.getItem("username")}
                onChange={(e) => {
                  setUN(e.target.value.trim());
                }}
              />
              <br />
              <h1 className={check1}>T??n ng?????i d??ng ph???i c?? t??? 6 k?? t??? tr??? l??n</h1>
              <label>Fullname</label>
              <br />
              <input
                type="text"
                required
                defaultValue={localStorage.getItem("fullname")}
                onChange={(e) => {
                  setFN(e.target.value.trim());
                }}
              />
              <br />
              <h1 className={check2}>T??n ?????y ????? ph???i c?? t??? 2 t??? tr??? l??n</h1>
              <label>Description</label>
              <br />
              <input
                type="text"
                defaultValue={localStorage.getItem("description")}
                onChange={(e) => {
                  setDes(e.target.value.trim());
                }}
              />
              <br />
              <label>Facebook</label>
              <br />
              <input
                type="text"
                defaultValue={localStorage.getItem("facebook")}
                onChange={(e) => {
                  setFb(e.target.value.trim());
                }}
              />
              <br />
              <div className="age--gender">
                <div className="input--box" style={{ width: "50%" }}>
                  <label>Age</label>
                  <br />
                  <input
                    type="number"
                    defaultValue={localStorage.getItem("age")}
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                  />
                </div>
                <div className="input--box" style={{ width: "50%" }}>
                  <label style={{ display: "block", marginTop: "-16px" }}>
                    Gender
                  </label>
                  <select
                    defaultValue={localStorage.getItem("gender")}
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <br />
                </div>
              </div>
              <div className="setting--submit--clear">
                <button
                  onClick={() => {
                    setClear("clear");
                  }}
                >
                  H???y b???
                </button>
                <button
                  onClick={() => {
                    updateData();
                  }}
                >
                  ?????ng ??
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={clear}>
        <div className="clear--all">
          <h1 className="clear--title">B???n ch???c ch???n mu???n h???y to??n b??? thay ?????i?</h1>
          <div className="clear--btn">
            <button
              onClick={() => {
                setClear("disable");
                window.location.href = "/";
              }}
            >
              H???y thay ?????i
            </button>
            <button
              onClick={() => {
                setClear("disable");
              }}
            >
              H???y
            </button>
          </div>
        </div>
      </div>
      <div className={success}>Th??nh c??ng</div>
      <div className={fail}>T??n ???? ???????c s??? d???ng</div>
    </div>
  );
}

export default Setting;
