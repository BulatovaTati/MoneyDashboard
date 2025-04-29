export const reactSelectStyles = {
    option: (provided, state) => ({
        ...provided,
        color: state.isDisabled ? '#d4d4d4' : '#fff',
        cursor: state.isDisabled ? 'not-allowed' : 'pointer',
    }),
    control: provided => ({
        ...provided,
        cursor: 'pointer',
    }),
    dropdownIndicator: provided => ({
        ...provided,
        cursor: 'pointer',
    }),
};
