interface IProps {
    children: string;
}

const Title: React.FC<IProps> = ({ children }) => {
    return <p className="font-primary font-semibold text-xl">{children}</p>;
};

export default Title;
