

export default function MainPageHeadContainer() {
    return (
        <section className="relative h-screen w-full flex justify-end">
            <div className="absolute bottom-1/2 end-1/2 mr-10 text-9xl font-bold">Motto</div>
            <div className="absolute top-1/2 end-1/3 mr-28 text-5xl font-medium text-right">Interior Design</div>
            <div className="absolute top-2/3 end-1/3 text-3xl font-medium">Some information will be typed here ...</div>
            <img className="object-cover w-2/5" src="/hardCodeImages/Project Chronology/00 cover.jpg" alt="Main Page Cover Image" />
        </section>
    );
}