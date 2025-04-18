import Sprite from '/icons/icons.svg';
export const Icons = ({ className, width = 12, height = 12, name }) => {
    return (
        <svg className={className} width={width} height={height} stroke="#fafafa">
            <use href={`${Sprite}#${name}`}></use>
        </svg>
    );
};
