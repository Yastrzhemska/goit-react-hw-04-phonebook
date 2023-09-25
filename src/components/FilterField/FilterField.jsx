import { Text, InputFilter } from './FilterField.styled';

export const FilterField = ({ filter, setFilter }) => {
  return (
    <>
      <Text>Find contacts by name</Text>
      <InputFilter
        type="text"
        value={filter}
        onChange={evt => {
          setFilter(evt.target.value);
        }}
      />
    </>
  );
};
