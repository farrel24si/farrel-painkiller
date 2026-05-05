export default function PageHeader({ title = "Dashboard", breadcrumb = [], children }) { 
  return (
    <div className="flex items-center justify-between p-6 bg-white/50 backdrop-blur-sm shadow-sm mb-4 border-b border-gray-100">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-gray-800">
          {title}
        </h1>
        <div className="flex items-center font-medium space-x-2 mt-2 text-sm">
          {/* Mapping array breadcrumb agar dinamis */}
          {Array.isArray(breadcrumb) ? (
            breadcrumb.map((item, index) => (
              <span key={index} className="flex items-center space-x-2">
                <span className={index === breadcrumb.length - 1 ? "text-hijau" : "text-gray-400"}>
                  {item}
                </span>
                {index < breadcrumb.length - 1 && <span className="text-gray-400">/</span>}
              </span>
            ))
          ) : (
            <span className="text-gray-400">{breadcrumb}</span>
          )}
        </div>
      </div>

      {/* Children akan dipakai untuk merender Button Add dari halaman masing-masing */}
      <div id="action-button">
        {children}
      </div>
    </div>
  );
}