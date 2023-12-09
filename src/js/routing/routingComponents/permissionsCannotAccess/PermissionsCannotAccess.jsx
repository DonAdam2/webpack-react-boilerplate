const PermissionsCannotAccess = ({ requiredPermissions }) => (
  <div>
    <h1>
      <span>403</span> <span>error</span>
    </h1>
    <h3>Unauthorized access!</h3>
    <p>We are sorry but you don't have the required permission/s to access this page:</p>
    <ul style={{ textAlign: 'left' }}>
      {Array.isArray(requiredPermissions) ? (
        requiredPermissions.map((el, i) => <li key={i}>{el}</li>)
      ) : (
        <li>
          <strong>{requiredPermissions}</strong>
        </li>
      )}
    </ul>
  </div>
);

export default PermissionsCannotAccess;
