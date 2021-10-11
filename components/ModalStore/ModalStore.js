import React, { useState } from "react";

export const initialBillModalState = {
  isViewModalOpen: false,
  isPayModalOpen: false,
  billSelected: "",
  billLatestPaid: "",
};

export const BillModalContext = React.createContext({
  onViewModalClose: () => undefined,
  onViewModalOpen: () => undefined,
  onPayModalClose: () => undefined,
  onPayModalOpen: () => undefined,
  onViewModalClosePayButtonOpen: () => undefined,
  onPayBill: () => undefined,
  modalState: initialBillModalState,
});

export const ModalStore = ({ children }) => {
  const [state, setState] = useState(initialBillModalState);

  const onViewModalClose = () => {
    setState({
      ...initialBillModalState,
      isViewModalOpen: false,
      billLatestPaid: state.billLatestPaid,
    });
  };
  const onViewModalOpen = (id) => {
    setState({
      ...initialBillModalState,
      isViewModalOpen: true,
      billSelected: id,
      billLatestPaid: state.billLatestPaid,
    });
  };
  const onPayModalClose = () => {
    setState({
      ...initialBillModalState,
      isPayModalOpen: false,
      billLatestPaid: state.billLatestPaid,
    });
  };
  const onPayModalOpen = (id) => {
    setState({
      ...initialBillModalState,
      isPayModalOpen: true,
      billSelected: id,
      billLatestPaid: state.billLatestPaid,
    });
  };
  const onViewModalClosePayButtonOpen = () => {
    setState({
      billSelected: state.billSelected,
      isViewModalOpen: false,
      isPayModalOpen: true,
      billLatestPaid: state.billLatestPaid,
    });
  };

  const onPayBill = (id) => {
    setState({ ...initialBillModalState, billLatestPaid: id });
  };

  const store = {
    state,
    onViewModalClose,
    onViewModalOpen,
    onPayModalClose,
    onPayModalOpen,
    onViewModalClosePayButtonOpen,
    onPayBill,
  };

  return (
    <BillModalContext.Provider value={store}>
      {children}
    </BillModalContext.Provider>
  );
};
