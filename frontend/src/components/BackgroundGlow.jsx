function BackgroundGlow() {
  return (
    <>
      <div className="fixed top-0 left-0 w-96 h-96 bg-cyan-500 opacity-20 blur-[150px] rounded-full -z-10"></div>

      <div className="fixed bottom-0 right-0 w-96 h-96 bg-purple-500 opacity-20 blur-[150px] rounded-full -z-10"></div>
    </>
  );
}

export default BackgroundGlow;  