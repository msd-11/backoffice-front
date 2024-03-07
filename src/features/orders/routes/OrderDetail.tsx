import * as dayjs from "dayjs";
import { useLocation } from "react-router-dom";

interface IProps {}

const OrderDetail: React.FC<IProps> = () => {
  const { state } = useLocation();

  const { id, customer, address, items, status, created_at, payment_id } =
    state.order;
  return (
    <div className="p-6" data-color-mode="light">
      <p className="pb-6 text-2xl font-bold">
        Détail de la commande N°{state.order.id}
      </p>

      <div className="bg-white rounded-lg">
        <p className="text-lg mb-2">Statut: {status}</p>
        <p className="text-lg mb-2">Client: {customer}</p>
        <p className="text-lg mb-2">
          Créée le: {dayjs(created_at).format("DD/MM/YYYY HH:mm")}
        </p>

        <div className="border-t border-gray-200 mt-6 pt-6">
          <h3 className="text-xl font-semibold mb-4">Adresse</h3>
          <div className="grid grid-cols-6 gap-0">
            <div>
              <p className="text-lg mb-2">Nom:</p>
              <p className="text-lg mb-2">Nom du contact:</p>
              <p className="text-lg mb-2">Adresse:</p>
              <p className="text-lg mb-2">Ville:</p>
              <p className="text-lg mb-2">Code postal:</p>
              <p className="text-lg mb-2">Pays:</p>
              <p className="text-lg mb-2">Téléphone:</p>
            </div>
            <div className="col-span-3">
              <p className="text-lg mb-2">{address.name}</p>
              <p className="text-lg mb-2">{address.contactName}</p>
              <p className="text-lg mb-2">{address.address}</p>
              <p className="text-lg mb-2">{address.city}</p>
              <p className="text-lg mb-2">{address.postalCode}</p>
              <p className="text-lg mb-2">{address.country}</p>
              <p className="text-lg mb-2">{address.phone}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-6 pt-6">
          <h3 className="text-xl font-semibold mb-4">Articles</h3>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between mb-4">
              <div>
                <p className="text-lg">{item.product.name}</p>
                <p className="text-lg">Quantité: {item.quantity}</p>
                <p className="text-lg">Prix: {item.price}€</p>
              </div>
              <img
                src={"http://localhost:8080" + item.product.images[0].path}
                alt={item.product.name}
                className="w-28 h-28"
              />
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 mt-6 pt-6">
          <h3 className="text-xl font-semibold mb-4">Paiement</h3>
          <p className="text-lg">
            ID de paiement: {payment_id ? payment_id : "Non disponible"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
