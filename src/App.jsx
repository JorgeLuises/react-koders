import clsx from "clsx";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createKoder, getKoders, deleteKoder } from "./api";
import { Toaster, toast } from "sonner";

export default function App () {
  const [koders, setKoders] = useState([]);

  //Recibe dos parametros
  //1. una función o callback
  //2. un arreglo de dependencias
  //useEffect se usa para ejecutar codigo en partes especificas del ciclo de vida de un componente
  //useEffect se ejecuta en dos ocasiones; Cuando el componente se renderiza por primera vez y la segunda, cuando cambia una de sus dependencias
  useEffect(() => {
    console.log('Hola desde use effect');
    getKoders()
      .then((koders) => {
        console.log("Koders:", koders)
        setKoders(koders);
      })
      .catch (error => {
        console.error("Error al obtener koders", error);
        alert("Error al obtener koders");
      });
  }, []);// Si el arreglo de dependencias queda vacío, quiere decir que el useEffect solo se va a ejecutar cuando se renderiza un componente

  const {
    register,
    handleSubmit,
    formState: {errors, isValid, isSubmitted},
    reset,
    setFocus
  } = useForm();

  async function onSubmit (data) {
    try {
            await createKoder({
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email
          });
        
          const kodersList = await getKoders();
          setKoders(kodersList);
          setFocus("firstName");
          reset();
          toast.success('Koder creado');

    } catch (error) {
      console.error('Error al crear koder', error);
      alert("Error al crear koder");
    }
  };

  function onDelete (koderId) {
    deleteKoder(koderId)
    .then (() => {
      toast.success('Koder eliminado');
      getKoders()
        .then((koders) => {
          setKoders(koders);
        })
        .catch ((error) => {
          console.error("Error al eliminar koder", error);
          alert("Error al eliminar koder");
        })
    })
    .catch ((error) => {
      console.error("Error al eliminar koder", error);
      alert("Error al eliminar koder");
    })
  }
  
  return (
    <>
    <Toaster position="top-right" richColors/>
    <main className="w-full min-h-screen">
      <form className="flex flex-grow gap-2 justify-center p-5"
            onSubmit={handleSubmit(onSubmit)}>
              <input type="text" 
                    placeholder="Ingresa tu nombre"
                    className={clsx("p-2 rounded text-black w-full max-w-screen-sm", {"border-2 border-red-500 bg-red-300": errors.koderName})}
                    {...register('firstName', {
                      required: {value: true, message: 'Campo requerido'},
                      minLength: {value: 2, message: 'Se requieren minimo 2 caracteres'},
                      maxLength: {value: 100, message: 'Demasiados caracteres'}
                    })}
              />

              <input type="text" 
                    placeholder="Ingresa tu apellido"
                    className={clsx("p-2 rounded text-black w-full max-w-screen-sm", {"border-2 border-red-500 bg-red-300": errors.koderLastName})}
                    {...register('lastName', {
                      required: {value: true, message: 'Campo requerido'},
                      minLength: {value: 2, message: 'Se requieren minimo 2 caracteres'},
                      maxLength: {value: 100, message: 'Demasiados caracteres'}
                    })}
              />

              <input type="email" 
                    placeholder="Ingresa tu email"
                    className={clsx("p-2 rounded text-black w-full max-w-screen-sm", {"border-2 border-red-500 bg-red-300": errors.koderMail})}
                    {...register('email', {
                      required: {value: true, message: 'Campo requerido'},
                      pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Correo inválido'}
                    })}
              />

              <button
                className="text-black px-3 rounded bg-white disabled:bg-stone-400"
                disabled={isSubmitted ? !isValid : false}
              >Agregar koder</button>
      </form>

      {errors.firstName && (<p className="text-red-500 text-center text-sm font-semibold">{errors.firstName?.message}</p>)}
      {errors.lastName && (<p className="text-red-500 text-center text-sm font-semibold">{errors.lastName?.message}</p>)}
      {errors.email && (<p className="text-red-500 text-center text-sm font-semibold">{errors.email?.message}</p>)}

    <div className="max-w-screen-sm w-full mx-auto p-4 flex flex-col gap-1 items-center">
      {
        koders.length === 0 && (<p className="text-white/50">No tienes koders registrados 😒</p>)
      }

      {
        koders.map((koder, idx) => {
          return (
            <div key={`koder-${idx}`} className="bg-white/10 rounded p-4 flex flex-row justify-between gap-3">
              <span className="select-none text-slate-200"><span className="select-none text-white font-bold">Nombre:</span> {koder.firstName}</span>
              <span className="select-none text-slate-200"><span className="select-none text-white font-bold">Apellido:</span> {koder.lastName}</span>
              <span className="select-none text-slate-200"><span className="select-none text-white font-bold">Email:</span> {koder.email}</span>
              <span className="text-red-500 cursor-pointer hover:bg-red-500 hover:text-white rounded-full p-1 size-5 text-center items-center flex" onClick={() => onDelete(koder.id)}>X</span>
            </div>
          )
        })
      }
    </div>
  </main>
  </>
  )
}