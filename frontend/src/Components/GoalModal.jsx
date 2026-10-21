import { useEffect, useState } from "react";
import axios from "axios";

function GoalModal({

    goal,

    closeModal,

    refreshDashboard

}) {

    const [form, setForm] = useState({

        title: "",

        target: "",

        saved: ""

    });

    useEffect(() => {

        if (goal) {

            setForm({

                title: goal.title,

                target: goal.target,

                saved: goal.saved

            });

        }

        else {

            setForm({

                title: "",

                target: "",

                saved: ""

            });

        }

    }, [goal]);

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const saveGoal = async () => {

        if (

            form.title.trim() === "" ||

            form.target === "" ||

            form.saved === ""

        ) {

            alert("Please fill all fields.");

            return;

        }

        try {

            if (goal) {

                await axios.put(

                    `/goals/${goal._id}`,

                    {

                        title: form.title,

                        target: Number(form.target),

                        saved: Number(form.saved)

                    }

                );

                alert("Goal Updated Successfully");

            }

            else {

                await axios.post(

                    "/goals",

                    {

                        title: form.title,

                        target: Number(form.target),

                        saved: Number(form.saved)

                    }

                );

                alert("Goal Added Successfully");

            }

            if (refreshDashboard) {

                await refreshDashboard();

            }

            closeModal();

        }

        catch (err) {

            console.log(err);

            alert("Unable to save Goal.");

        }

    };

    return (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

            <div className="bg-white w-[500px] rounded-2xl shadow-2xl p-8">

                <h1 className="text-3xl font-bold mb-8">

                    {

                        goal

                            ? "Edit Goal"

                            : "Add New Goal"

                    }

                </h1>

                <div className="space-y-5">

                    <input

                        type="text"

                        name="title"

                        placeholder="Goal Name"

                        value={form.title}

                        onChange={handleChange}

                        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"

                    />

                    <input

                        type="number"

                        name="target"

                        placeholder="Target Amount"

                        value={form.target}

                        onChange={handleChange}

                        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"

                    />

                    <input

                        type="number"

                        name="saved"

                        placeholder="Saved Amount"

                        value={form.saved}

                        onChange={handleChange}

                        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"

                    />

                </div>

                <div className="flex justify-end gap-4 mt-8">

                    <button

                        onClick={closeModal}

                        className="px-6 py-3 rounded-lg bg-gray-300 hover:bg-gray-400"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={saveGoal}

                        className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"

                    >

                        {

                            goal

                                ? "Update Goal"

                                : "Save Goal"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}

export default GoalModal;