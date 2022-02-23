import { useDispatch, useSelector } from 'react-redux';
//selectors
import { getTestAction } from '@/js/store/app/selectors/AppSelectors';
//actions
import { setTestAction } from '@/js/store/app/actions/AppActions';

const TestComponent = () => {
  const dispatch = useDispatch(),
    testAction = useSelector((state) => getTestAction({ state }));

  return (
    <div className="container">
      <p>
        Current environment API is <strong>{process.env.BASE_URL}</strong>
      </p>
      <p>
        Testing the store <strong>{testAction}</strong>
      </p>
      <button onClick={() => dispatch(setTestAction())} data-testid="changeText">
        Change text
      </button>
    </div>
  );
};

export default TestComponent;
