import RestrictedWrapper from '@/js/routing/routingComponents/RestrictedWrapper';

const RestrictedSection = ({ requiredPermissions, children }) => (
  <RestrictedWrapper requiredPermissions={requiredPermissions} notPermittedComponent={null}>
    {children}
  </RestrictedWrapper>
);

export default RestrictedSection;
