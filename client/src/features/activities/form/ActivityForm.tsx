import React, { useState, useEffect } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "./MyTextArea";
import MySelectInput from "./MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "./MyDateInput";
import { Activity } from "../../../app/models/activity";
function ActivityForm() {
  const { activityStore } = useStore();
  const {
    loadActivity,
    createActivity,
    updateActivity,
    loading,
    loadingInitial,
  } = activityStore;

  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: null,
    city: "",
    venue: "",
  });
  const validationSchema = Yup.object({
    title: Yup.string().required("the activity title is required"),
    description: Yup.string().required("the activity description is required"),
    category: Yup.string().required(),
    date: Yup.string().required(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
  });
  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);

  const handelFormSubmit = (activity: Activity) => {
    if (!activity.id) {
      activity.id = uuid();
      createActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    } else {
      updateActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    }
  };

  if (loadingInitial) return <LoadingComponent content="Loading activity" />;
  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => handelFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput placeholder="title" name="title" />
            <MyTextArea rows={3} name="description" placeholder="Description" />
            <MySelectInput
              options={categoryOptions}
              placeholder="Category"
              name="category"
            />
            <MyDateInput
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat="mmmm d, yyyy h:mm aa"
            />
            <Header content="Location Details" sub color="teal" />
            <MyTextInput placeholder="City" name="city" />
            <MyTextInput placeholder="Venue" name="venue" />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              floated="right"
              positive
              type="submit"
              content="submit"
              loading={loading}
            />
            <Button
              as={Link}
              to="/activities"
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}

export default observer(ActivityForm);
