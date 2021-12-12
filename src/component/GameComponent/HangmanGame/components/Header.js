import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

// rafce
const Header = () => {

  


  const HandleButton = () => {
    Swal.fire({
      icon: "warning",
      title: "Quy tắc",
      text: "Nhập phím từ bàn phím để lựa chọn!",
      confirmButtonColor: "#2563EB",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "info",
          title: "Thông tin",
          text: "Bạn không cần nhập từ có dấu. Hệ thống sẽ giúp bạn!",
          confirmButtonColor: "#2563EB",
        });
      }
    });
  };

  return (
    <div className="header" >
      <h1>Hangman Games</h1>
      <p>Tìm từ được giấu đi!</p>
      <p>Bạn có 5 phút để tìm!</p>
      <button onClick={HandleButton}>Quy tắc</button>
    </div >
  );
};

export default Header;
