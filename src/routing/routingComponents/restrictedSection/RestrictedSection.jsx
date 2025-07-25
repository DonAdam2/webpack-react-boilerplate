import RestrictedWrapper from '../restrictedWrapper/RestrictedWrapper';

const RestrictedSection = ({ requiredPermissions, children }) => (
  <RestrictedWrapper requiredPermissions={requiredPermissions}>{children}</RestrictedWrapper>
);

export default RestrictedSection;
