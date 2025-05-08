interface BgProps {
    children: React.ReactNode;
    backgroundImageRoute?: string;
    }

function BG({children = null, backgroundImageRoute = '/fondo.jpg'}: BgProps) 
{
    return (
        <div
      className="min-h-screen flex flex-col backgroundStyles"
      style={{
        backgroundImage: `url('${backgroundImageRoute}')`
      }}
    >
      <div className="blurEffect"></div>
      
      {children}
    </div>
    )
}

export default BG;