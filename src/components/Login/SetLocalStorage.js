import { useParams } from "react-router-dom";
import localConfig from "../../appConfig/local";

const SetLocalStorage = async () => {
  const params = useParams();

  let result = await fetch(
    `${localConfig.apiUrl}/public/api/v1/auth/getUser/${params.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  result = await result.json();
  await localStorage.setItem("user-info", JSON.stringify(result.result));
  window.location.href = "/expenseHome";
};

export default SetLocalStorage;
