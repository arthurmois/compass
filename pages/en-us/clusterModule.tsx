import React, { useState } from 'react'
import { NextPage } from 'next'
import { useTheme, Grid, Input } from 'components'
import { Button, Card, Modal, Page, Spacer, Text } from '@geist-ui/core'
import {
  AlignJustify,
  CornerDownRight,
  Filter,
  Plus,
  Search,
  Settings,
  ThumbsUp,
} from '@geist-ui/icons'
import data from './data/data.json'

const Application: NextPage<{}> = () => {
  const theme = useTheme()

  const [deleteAllModal, setDeleteAllModal] = React.useState(false)
  const [selectedCluster, setSelectedCluster] = useState(0)
  const [searchCommentsValue, setSearchCommentsValue] = useState('')

  const selectClusterHandler = (clusterId: number) => {
    setSelectedCluster(clusterId)
    console.log(clusterId)
  }
  const closeModalHandler = () => {
    setDeleteAllModal(false)
  }

  const inputHandler = (e: { target: { value: React.SetStateAction<string> } }) => {
    setSearchCommentsValue(e.target.value)
    console.log(e.target.value)
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Card
        style={{
          flex: 0.5,
          overflowY: 'hidden',
        }}
      />
      <Card
        style={{
          flex: 1,
          overflowY: 'scroll',
        }}>
        <Grid.Container gap={2} justify="center">
          <Grid xs={4} style={{ justifyContent: 'center', alignItems: 'center' }}></Grid>
          <Grid xs={16} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text h2>Cluster Category</Text>
          </Grid>
          <Grid xs={4} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Button style={{ borderRadius: '10px' }} iconRight={<Plus />} auto ghost />
          </Grid>
          {data.map(cluster => {
            return (
              <Grid xs={24}>
                <Card
                  hoverable
                  type={selectedCluster === cluster.cluster_id ? 'dark' : 'default'}
                  onClick={() => {
                    selectClusterHandler(cluster.cluster_id)
                  }}
                  style={{ width: '100%', cursor: 'pointer' }}>
                  {cluster.cluster_name}
                </Card>
              </Grid>
            )
          })}
        </Grid.Container>
      </Card>

      <Card style={{ flex: 2, overflowY: 'scroll' }}>
        <Modal visible={deleteAllModal} onClose={closeModalHandler}>
          <Modal.Title>Delete all comments in this cluster</Modal.Title>
          <Modal.Subtitle>This action cannot be undone</Modal.Subtitle>
          <Spacer h={1} />
          <div style={{ justifyContent: 'center' }}>
            <Text h5>Are you sure you'd like to proceed?</Text>
          </div>
          <Modal.Action passive onClick={() => setDeleteAllModal(false)}>
            Cancel
          </Modal.Action>
          <Modal.Action style={{ color: 'red' }}>Delete</Modal.Action>
        </Modal>
        <Grid.Container gap={2} justify="center">
          <Grid xs={6} style={{ justifyContent: 'left', alignItems: 'center' }}>
            <Text h2 style={{ justifyContent: 'center', alignItems: 'center' }}>
              Comments
            </Text>
          </Grid>
          <Grid xs={10}>
            <Input
              w="100%"
              font="1.125rem"
              py={0.75}
              value={searchCommentsValue}
              icon={<Search />}
              onChange={inputHandler}
              placeholder="Search comments in this cluster"
              className="search-input"
              clearable
            />
          </Grid>
          <Grid xs={8} style={{ justifyContent: 'right', alignItems: 'center' }}>
            <AlignJustify />
            <Spacer w={1} />
            <Filter />
            <Spacer w={3} />
            <Button
              ghost
              type="error"
              onClick={() => {
                setDeleteAllModal(true)
              }}>
              Delete all comments in cluster
            </Button>
          </Grid>
          {data
            ?.find(cluster => cluster.cluster_id === selectedCluster)
            ?.comments?.filter(element =>
              element.Comment.toLocaleLowerCase().includes(
                searchCommentsValue.toLocaleLowerCase(),
              ),
            )
            ?.map(commentObj => {
              //comments generation
              return (
                <Grid xs={24} style={{ display: 'flex' }}>
                  <Card style={{ width: '100%', alignItems: 'center' }}>
                    <Text>
                      <Text small>UserName</Text>
                      <Text small style={{ color: 'grey' }}>
                        {' ' + commentObj.Time}
                      </Text>
                    </Text>
                    <Text>{commentObj.Comment}</Text>
                    <div style={{ alignItems: 'center', display: 'flex' }}>
                      <ThumbsUp />
                      <Spacer w={0.5} />
                      {commentObj.Likes}
                      <Spacer w={1} />
                      <Button icon={<CornerDownRight />} type={'abort'} width={0.6}>
                        Reply
                      </Button>
                    </div>
                  </Card>
                </Grid>
              )
            })}
        </Grid.Container>
      </Card>
      <Card
        style={{
          flex: 0.5,
          overflowY: 'hidden',
        }}
      />
      <style jsx>{`
        ::webkit-scrollbar {
          width: 7999px;
        }
        .layout {
          min-height: calc(100vh - var(--geist-page-nav-height));
          max-width: ${theme.layout.pageWidthWithMargin};
          margin: 0 auto;
          padding: 0 ${theme.layout.gap} calc(${theme.layout.gap} * 2);
          box-sizing: border-box;
        }
        .hero {
          height: calc(100vh - var(--geist-page-nav-height) - 300px);
          min-height: 30vh;
          max-width: 500px;
          margin: 0 auto;
          text-align: center;
          align-items: center;
          justify-content: center;
          display: flex;
          flex-direction: column;
        }
        .title {
          font-size: 3.75rem;
          font-weight: 700;
          margin: 0;
        }
        .desc {
          color: ${theme.palette.accents_5};
          font-size: 1.5rem;
          font-weight: 500;
          margin: 0 0 ${theme.layout.gap};
        }
      `}</style>
    </div>
    // <Page>
    //   <Grid.Container gap={2} justify="center" height="100px">
    //     <Grid xs={6}>
    //       <div className="scrollable-container">
    //         <div className="layout">
    //           <Grid.Container gap={2} justify="center">
    //             <Grid xs={24} md={24}>
    //               <HomeCell
    //                 icon={<PackageIcon />}
    //                 url="/en-us/components"
    //                 title="Components"
    //                 desc="Ever-increasing list of concise and aesthetic components."
    //               />
    //             </Grid>
    //             <Grid xs={24} md={24}>
    //               <HomeCell
    //                 icon={<FeatherIcon />}
    //                 url="/en-us/guide/themes"
    //                 title="Customizable"
    //                 desc="Configure sizes, colors, appearances, shapes, and more."
    //               />
    //             </Grid>
    //             <Grid xs={24} md={24}>
    //               <HomeCell
    //                 icon={<GitHubIcon />}
    //                 url="https://github.com/geist-org/geist-ui"
    //                 title="Open Sourced"
    //                 desc="Geist is open sourced and available free under MIT licence."
    //               />
    //             </Grid>
    //             <Grid xs={24} md={24}>
    //               <HomeCell
    //                 icon={<GitHubIcon />}
    //                 url="https://github.com/geist-org/geist-ui"
    //                 title="Open Sourced"
    //                 desc="Geist is open sourced and available free under MIT licence."
    //               />
    //             </Grid>
    //             <Grid xs={24} md={24}>
    //               <HomeCell
    //                 icon={<GitHubIcon />}
    //                 url="https://github.com/geist-org/geist-ui"
    //                 title="Open Sourced"
    //                 desc="Geist is open sourced and available free under MIT licence."
    //               />
    //             </Grid>
    //             <Grid xs={24} md={24}>
    //               <HomeCell
    //                 icon={<GitHubIcon />}
    //                 url="https://github.com/geist-org/geist-ui"
    //                 title="Open Sourced"
    //                 desc="Geist is open sourced and available free under MIT licence."
    //               />
    //             </Grid>
    //             <Grid xs={24} md={24}>
    //               <HomeCell
    //                 icon={<GitHubIcon />}
    //                 url="https://github.com/geist-org/geist-ui"
    //                 title="Open Sourced"
    //                 desc="Geist is open sourced and available free under MIT licence."
    //               />
    //             </Grid>
    //             <Grid xs={24} md={24}>
    //               <HomeCell
    //                 icon={<GitHubIcon />}
    //                 url="https://github.com/geist-org/geist-ui"
    //                 title="Open Sourced"
    //                 desc="Geist is open sourced and available free under MIT licence."
    //               />
    //             </Grid>
    //             <Grid xs={24} md={24}>
    //               <HomeCell
    //                 icon={<GitHubIcon />}
    //                 url="https://github.com/geist-org/geist-ui"
    //                 title="Open Sourced"
    //                 desc="Geist is open sourced and available free under MIT licence."
    //               />
    //             </Grid>
    //           </Grid.Container>
    //         </div>
    //       </div>
    //     </Grid>
    //     <Grid xs={18}>
    //     <div className="scrollable-container">
    //         <div className="layout">
    //           <div className="hero">
    //             <h1 className="title">Cluster Module</h1>
    //             <h3 className="desc">A modern tool for the content-creator of today.</h3>
    //             <Input
    //               w="100%"
    //               font="1.125rem"
    //               py={0.75}
    //               value={value}
    //               onChange={inputHandler}
    //               placeholder="Insert a YouTube link"
    //               className="search-input"
    //               clearable
    //             />
    //             <Button width="25%" onClick={searchHandler}>
    //               Search
    //             </Button>
    //           </div>

    //           <Grid.Container gap={2} justify="center">
    //             <Grid xs={24} md={8}>
    //               <HomeCell
    //                 icon={<PackageIcon />}
    //                 url="/en-us/components"
    //                 title="Components"
    //                 desc="Ever-increasing list of concise and aesthetic components."
    //               />
    //             </Grid>
    //             <Grid xs={24} md={8}>
    //               <HomeCell
    //                 icon={<FeatherIcon />}
    //                 url="/en-us/guide/themes"
    //                 title="Customizable"
    //                 desc="Configure sizes, colors, appearances, shapes, and more."
    //               />
    //             </Grid>
    //             <Grid xs={24} md={8}>
    //               <HomeCell
    //                 icon={<GitHubIcon />}
    //                 url="https://github.com/geist-org/geist-ui"
    //                 title="Open Sourced"
    //                 desc="Geist is open sourced and available free under MIT licence."
    //               />
    //             </Grid>
    //           </Grid.Container>
    //         </div>
    //       </div>
    //     </Grid>
    //   </Grid.Container>

    //   <style jsx>{`
    //     .scrollable-container {
    //       height: 100vh; /* Adjust the height according to your requirements */
    //       overflow: auto; /* Enable scrolling when content overflows */
    //     }
    //     .layout {
    //       min-height: calc(100vh - var(--geist-page-nav-height));
    //       max-width: ${theme.layout.pageWidthWithMargin};
    //       margin: 0 auto;
    //       padding: 0 ${theme.layout.gap} calc(${theme.layout.gap} * 2);
    //       box-sizing: border-box;
    //     }
    //     .hero {
    //       height: calc(100vh - var(--geist-page-nav-height) - 300px);
    //       min-height: 30vh;
    //       max-width: 500px;
    //       margin: 0 auto;
    //       text-align: center;
    //       align-items: center;
    //       justify-content: center;
    //       display: flex;
    //       flex-direction: column;
    //     }
    //     .title {
    //       font-size: 3.75rem;
    //       font-weight: 700;
    //       margin: 0;
    //     }
    //     .desc {
    //       color: ${theme.palette.accents_5};
    //       font-size: 1.5rem;
    //       font-weight: 500;
    //       margin: 0 0 ${theme.layout.gap};
    //     }
    //   `}</style>
    // </Page>
  )
}

export default Application
