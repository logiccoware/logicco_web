
export interface IProps {
  children: React.ReactNode;
  modal: React.ReactNode; 
}

export default async function Layout({ children, modal }: IProps) {
  return (
    <div>
      {children}
      {modal} 
    </div>
  );
}
