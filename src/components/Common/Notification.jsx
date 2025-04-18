import Swal from "sweetalert2";

export const NotifySuccess = (message) => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: message,
    showConfirmButton: true,
    customClass: {
      confirmButton: "btn btn-primary",
    },
    // timer: 2000
  });
};

export const NotifyError = (message) => {
  Swal.fire({
    position: "center",
    icon: "error",
    title: message,
    showConfirmButton: true,
    customClass: {
      confirmButton: "btn btn-primary",
    },
    // timer: 2000
  });
};

export const NotifyInfo = (message) => {
  Swal.fire({
    position: "center",
    icon: "info",
    title: message,
    showConfirmButton: true,
    customClass: {
      confirmButton: "btn btn-primary",
    },
    // timer: 2000
  });
};

export const NotifyWaring = () => {

};

export const NotifyLoginAlert = (setShowModal) => {
  Swal.fire({
    icon: "error",
    title: "You need to login.",
    text: " Please log in or sign up to continue.",
    showCancelButton: true,
    confirmButtonText: "Login",
  }).then((result) => {
    if (result.isConfirmed) {
      setShowModal(true)
    }
  })
}
