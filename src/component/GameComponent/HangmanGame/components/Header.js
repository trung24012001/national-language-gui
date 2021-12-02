import React from "react";
import Swal from "sweetalert2";

// rafce
const Header = () => {
  const HandleButton = () => {
    Swal.fire({
      icon: "warning",
      title: "Quy tắc",
      text: "Bạn phải đoán chính xác từ cần tìm!",
      confirmButtonColor: "#2563EB",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "info",
          title: "Thông tin",
          text: "Có 45 từ được chọn ngẫu nhiên!",
          confirmButtonColor: "#2563EB",
        });
      }
    });
  };

  return (
    <>
      <h1>Hangman Games</h1>
      <p>Tìm từ được giấu đi!</p>
      <button onClick={HandleButton}>Quy tắc</button>
    </>
  );
};

export default Header;
