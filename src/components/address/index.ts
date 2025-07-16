export { default as AddressSelection } from './AddressSelection';
export { default as AddAddressModal, setGlobalAddressHandler } from './AddAddressModal';
export { default as OrderSummary } from './OrderSummary';

// Types
export interface Address {
  id: string;
  label: string;
  phone: string;
  fullAddress: string;
  isDefault?: boolean;
}