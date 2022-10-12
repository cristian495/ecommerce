import Link from "next/link";
import { useEffect, useState } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { useCartState } from "hooks";
import { runFireworks } from "lib/utils";

const Success = () => {
  const { clearCart } = useCartState();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    localStorage.clear();
    clearCart();
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Gracias por su pedido!</h2>
        <p className="email-msg">
          Revisa tu correo electronico para ver el comprobante
        </p>
        <p className="description">
          Si tienes alguna pregunta, porfavor contactanos{" "}
          <a href="mailto:order@example.com" className="email">
            order@exmple.com
          </a>
        </p>
        <Link href="/">
          <button type="button" className="btn">
            Continuar comprando
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
