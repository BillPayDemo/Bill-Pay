import React, { useState } from "react";

export const initialBillModalState = {
  isViewModalOpen: false,
  isPayModalOpen: false,
  billSelected: "",
};

export const BillModalContext = React.createContext({
  onViewModalClose: () => undefined,
  onViewModalOpen: () => undefined,
  onPayModalClose: () => undefined,
  onPayModalOpen: () => undefined,
  onViewModalClosePayButtonOpen: () => undefined,
  latestPaidBillId: () => undefined,
  modalState: initialBillModalState,
});

export const ModalStore = ({ children }) => {
  const [state, setState] = useState(initialBillModalState);

  const onViewModalClose = () => {
    setState({ ...initialBillModalState, isViewModalOpen: false });
  };
  const onViewModalOpen = (id) => {
    setState({
      ...initialBillModalState,
      isViewModalOpen: true,
      billSelected: id,
    });
  };
  const onPayModalClose = () => {
    setState({ ...initialBillModalState, isPayModalOpen: false });
  };
  const onPayModalOpen = (id) => {
    setState({
      ...initialBillModalState,
      isPayModalOpen: true,
      billSelected: id,
    });
  };
  const onViewModalClosePayButtonOpen = () => {
    setState({
      billSelected: state.billSelected,
      isViewModalOpen: false,
      isPayModalOpen: true,
    });
  };

  const latestPaidBillId = () => {
    setState({ latestPaidBillId: state.latestPaidBillId });
  };

  const store = {
    state,
    onViewModalClose,
    onViewModalOpen,
    onPayModalClose,
    onPayModalOpen,
    onViewModalClosePayButtonOpen,
    latestPaidBillId,
  };

  return (
    <BillModalContext.Provider value={store}>
      {children}
    </BillModalContext.Provider>
  );
};
